import Link from "next/link";
import React, { useMemo } from "react";
import { supabase } from "@src/utils/supabaseClient";
import * as Styles from "./styles";

type pageProps = {
  title: string;
  href: string;
  visible: boolean;
};

function NavBar() {
  const authUser = supabase.auth.user()?.role === "authenticated";
  const pages: pageProps[] = useMemo(() => {
    return [
      {
        href: "/register",
        title: "Register",
        visible: !authUser
      },
      {
        href: "/login",
        title: "Login",
        visible: !authUser
      },
      {
        href: "/?logout=true",
        title: "Logout",
        visible: authUser
      },
      {
        href: "/profile",
        title: "Profile",
        visible: authUser
      }
    ];
  }, [authUser]);

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
