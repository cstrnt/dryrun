import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout as DefaultLayout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || DefaultLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <Layout>
          {publicPages.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <main>
                  <p>
                    Please{" "}
                    <Link href="/sign-in">
                      <a>sign in</a>
                    </Link>{" "}
                    to access this page.
                  </p>
                </main>
              </SignedOut>
            </>
          )}
        </Layout>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
