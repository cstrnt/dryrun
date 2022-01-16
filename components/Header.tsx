import { UserButton, useUser } from "@clerk/nextjs";
import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";
import Link from "next/link";

const theme = {
  header: {
    backgroundColor: "#fdba74",
    textColor: "black",
  },
  footer: {
    backgroundColor: "#fdba74",
    textColor: "black",
  },
  icon: {
    borderColor: "#f97316",
  },
};

export const Header = () => {
  const user = useUser();
  return (
    <div className="bg-orange-200">
      <div className="flex justify-between items-center container mx-auto px-8 py-2">
        <Link href="/" passHref>
          <a>
            <h1 className="font-serif text-4xl tracking-wide font-bold">
              Foodie
            </h1>
          </a>
        </Link>
        <div className="flex space-x-2 items-center">
          {user && (
            <>
              <UserButton />
              <Link href="/new" passHref>
                <a className="text-2xl">+</a>
              </Link>
              <MagicBell
                apiKey={process.env.NEXT_PUBLIC_MAGICBELL_API_KEY}
                userExternalId={user.id}
                theme={theme}
              >
                {(props) => <FloatingNotificationInbox {...props} />}
              </MagicBell>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
