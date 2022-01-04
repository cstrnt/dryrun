import { requireSession, WithSessionProp } from "@clerk/nextjs/api";
import { ReactionType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/prisma";

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
      await db.reaction.create({
        data: {
          postId,
          type: reaction,
          userId: req.session!.userId!,
        },
      });
    }
    res.end();
  }
);
