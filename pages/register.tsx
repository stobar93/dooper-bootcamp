import type { NextPage } from "next";
import Link from "next/link";

const Register: NextPage = () => {
  return (
    <>
      <h1>Register</h1>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </nav>
    </>
  );
};

export default Register;
