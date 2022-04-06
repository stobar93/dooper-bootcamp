import type { NextPage } from "next";
import Link from "next/link";

const Login: NextPage = () => {
  return (
    <>
      <h1>Login</h1>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </nav>
    </>
  );
};

export default Login;
