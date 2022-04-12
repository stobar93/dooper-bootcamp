import Link from "next/link";
import React from "react";
import * as Styles from "./styles";

type pageProps = {
  title: string;
  href: string;
};

const pages: pageProps[] = [
  {
    href: "/register",
    title: "Register"
  },
  {
    href: "/login",
    title: "Login"
  },
  {
    href: "/profile",
    title: "Profile"
  }
];

function NavBar() {
  return (
    <Styles.StyledBox>
      {pages.map((page) => (
        <Link key={`${page.title}-link`} href={page.href} passHref>
          <Styles.Anchor>{page.title}</Styles.Anchor>
        </Link>
      ))}
    </Styles.StyledBox>
  );
}

export default NavBar;
