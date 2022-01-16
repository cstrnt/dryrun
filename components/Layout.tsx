import { withUser } from "@clerk/nextjs";
import { Header } from "./Header";

export const Layout: React.FC = withUser(({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="bg-orange-50 flex-1 flex">
      <div className="container mx-auto p-8 flex-1">{children}</div>
    </div>
  </div>
));
