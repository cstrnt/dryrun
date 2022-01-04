import { SignUp } from "@clerk/nextjs";
import { Layout } from "../../components/Layout";

const SignUpPage = () => (
  <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
);

SignUpPage.Layout = Layout;
export default SignUpPage;
