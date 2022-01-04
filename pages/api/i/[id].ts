import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string | undefined;
  const img = await db.post.findUnique({
    where: { id },
    select: { image: true },
  });
  if (!img || !id) {
    res.status(404).end();
    return;
  }
  res.setHeader("cache-control", "public, max-age=31536000");
  res.setHeader("Content-Type", "image/jpeg");
  res.send(img.image);
}
