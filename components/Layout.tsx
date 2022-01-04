import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => (
  <div className="bg-orange-200">
    <div className="flex justify-between items-center container mx-auto px-8 py-2">
      <h1 className="font-serif text-4xl font-bold">Foodie</h1>
      <div className="flex space-x-2">
        <UserButton />
        <Link href="/new" passHref>
          <a className="text-2xl">+</a>
        </Link>
      </div>
    </div>
  </div>
);

export const Layout: React.FC = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="bg-orange-50 flex-1 flex">
      <div className="container mx-auto p-8 flex-1">{children}</div>
    </div>
  </div>
);
