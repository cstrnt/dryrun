import { requireSession, RequireSessionProp, users } from "@clerk/nextjs/api";
import { NextApiResponse } from "next";
import { withFileUpload, getConfig, FormNextApiRequest } from "next-multipart";
import { db } from "../../lib/prisma";

async function newImageHandler(
  req: RequireSessionProp<FormNextApiRequest>,
  res: NextApiResponse
) {
  const file = req.file;
  const description = req.fields["description"];
  if (!file || !description) {
    res.status(500).end();
    return;
  }
  if (!file.mimetype?.includes("image")) {
    res.status(500).end();
    return;
  }
  const clerkUser = await users.getUser(req.session.userId!);
  const newPost = await db.post.create({
    data: {
      author: {
        connectOrCreate: {
          where: { id: req.session.userId! },
          create: {
            id: req.session.userId!,
            firstName: clerkUser.firstName!,
            lastName: clerkUser.lastName!,
            avatarUrl: clerkUser.profileImageUrl!,
          },
        },
      },
      image: await file.toBuffer(),
      description,
    },
  });
  res.json(newPost);
}

export default requireSession(withFileUpload(newImageHandler));

export const config = getConfig();
