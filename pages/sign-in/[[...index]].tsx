import { SignIn } from "@clerk/nextjs";
import { Layout } from "../../components/Layout";

const SignInPage = () => (
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
);

SignInPage.Layout = Layout;
export default SignInPage;
