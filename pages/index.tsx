import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { useQuery } from "react-query";
import { Post as PostDTO, User } from "@prisma/client";
import { PostWithUser } from "./api/all";

const Home = () => {
  const { data: posts, isLoading } = useQuery<PostWithUser[]>(
    "posts",
    async () => fetch("/api/all").then((res) => res.json())
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="space-y-24 flex flex-col items-center">
      {posts?.length ? (
        posts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <p>Empty here :(</p>
      )}
    </div>
  );
};

Home.Layout = Layout;

export default Home;
