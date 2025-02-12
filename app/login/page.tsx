import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <LoginForm></LoginForm>;
    </>
  );
};

export const metadata: Metadata = {
  title: "Bug Tracker - Login",
  description: "Login to the Bug Tracker",
};

export default LoginPage;
