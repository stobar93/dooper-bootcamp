import { useUser } from "@supabase/supabase-auth-helpers/react";
import Link from "next/link";
import React, { useMemo } from "react";
import * as Styles from "./styles";

type pageProps = {
  title: string;
  href: string;
  visible: boolean;
};

function NavBar() {
  const { user } = useUser();

  const pages: pageProps[] = useMemo(() => {
    return [
      {
        href: "/register",
        title: "Register",
        visible: !user
      },
      {
        href: "/login",
        title: "Login",
        visible: !user
      },
      {
        href: "/?logout=true",
        title: "Logout",
        visible: !!user
      },
      {
        href: "/profile",
        title: "Profile",
        visible: !!user
      }
    ];
  }, [user]);

  return (
    <Styles.StyledBox>
      {pages
        .filter((page) => page.visible)
        .map((page) => (
          <Link key={`${page.title}-link`} href={page.href} passHref>
            <Styles.Anchor>{page.title}</Styles.Anchor>
          </Link>
        ))}
    </Styles.StyledBox>
  );
}

export default NavBar;
