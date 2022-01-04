import { useUser } from "@clerk/nextjs";
import { Reaction, ReactionType } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation } from "react-query";
import { PostWithUser } from "../pages/api/all";
import { queryClient } from "../pages/_app";
dayjs.extend(relativeTime);

interface EmojiButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  emoji: string;
  count: number;
}

const EmojiButton = ({
  onClick,
  isActive = false,
  emoji,
  count,
}: EmojiButtonProps) => (
  <button onClick={onClick}>
    <span className={isActive ? "grayscale-0" : "grayscale"}>{emoji}</span>
    <span className="ml-2">{count}</span>
  </button>
);

export const Post = ({
  id,
  createdAt,
  author,
  reactions,
  description,
}: PostWithUser) => {
  const { id: userId } = useUser();

  const mutation = useMutation(
    (reaction: ReactionType) => {
      return fetch("/api/react", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: id, reaction }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full w-8 h-8"
          src={author.avatarUrl}
          alt={author.firstName}
        />
        <span>
          {author.firstName} {author.lastName}
        </span>
      </div>
      <div className="flex-1">
        <img
          src={`/api/i/${id}`}
          alt="d"
          className="h-[600px] w-[600px] object-cover"
        />
      </div>
      <div className="flex space-x-6">
        <EmojiButton
          count={reactions.filter((r) => r.type === ReactionType.LIKE).length}
          emoji={`👍`}
          isActive={reactions.some(
            (r) => r.userId === userId && r.type === ReactionType.LIKE
          )}
          onClick={() => mutation.mutate(ReactionType.LIKE)}
        />
        <EmojiButton
          emoji={`😋`}
          count={reactions.filter((r) => r.type === ReactionType.YUM).length}
          isActive={reactions.some(
            (r) => r.userId === userId && r.type === ReactionType.YUM
          )}
          onClick={() => mutation.mutate(ReactionType.YUM)}
        />
        <EmojiButton
          emoji={`😍`}
          count={
            reactions.filter((r) => r.type === ReactionType.HEART_EYES).length
          }
          isActive={reactions.some(
            (r) => r.userId === userId && r.type === ReactionType.HEART_EYES
          )}
          onClick={() => mutation.mutate(ReactionType.HEART_EYES)}
        />
      </div>
      <div>
        <p>{description}</p>
      </div>
      <p className="text-xs text-gray-400">posted {dayjs().to(createdAt)}</p>
    </div>
  );
};
