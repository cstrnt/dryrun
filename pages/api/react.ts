import { requireSession, WithSessionProp } from "@clerk/nextjs/api";
import { ReactionType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/prisma";
import MagicBellClient, { Notification } from "@magicbell/core";

export default requireSession(
  async (req: WithSessionProp<NextApiRequest>, res: NextApiResponse) => {
    const { postId, reaction } = req.body as {
      postId: string;
      reaction: ReactionType;
    };

    if (!postId || !(reaction in ReactionType)) {
      res.status(405).end();
      return;
    }

    const currentReaction = await db.reaction.findFirst({
      where: {
        AND: [
          {
            postId,
          },
          {
            userId: req.session!.userId!,
          },
          { type: reaction },
        ],
      },
    });
    if (currentReaction) {
      await db.reaction.delete({ where: { id: currentReaction.id } });
    } else {
      MagicBellClient.configure({
        apiKey: process.env.NEXT_PUBLIC_MAGICBELL_API_KEY!,
        apiSecret: process.env.MAGICBELL_API_SECRET!,
      });

      const newReaction = await db.reaction.create({
        data: {
          postId,
          type: reaction,
          userId: req.session!.userId!,
        },
        include: { User: true },
      });

      await Notification.create({
        title: `New Reaction to your post`,
        recipients: [{ external_id: req.session!.userId! }],
        content: `${newReaction.User.firstName} reacted to your post with ${reaction}`,
      });
    }
    res.end();
  }
);
