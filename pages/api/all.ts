import { requireSession } from "@clerk/nextjs/api";
import { Post, User, Reaction } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/prisma";

export type PostWithUser = Post & {
  author: User;
  reactions: Reaction[];
  createdAt: string;
};

export default requireSession(async function getAllPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { author: true, reactions: true },
  });
  res.json(
    posts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    })) as PostWithUser[]
  );
});
