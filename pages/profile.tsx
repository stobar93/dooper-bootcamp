import type { NextPage } from "next";
import Link from "next/link";

const Profile: NextPage = () => {
  return (
    <>
      <h1>Profile</h1>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </nav>
    </>
  );
};

export default Profile;
