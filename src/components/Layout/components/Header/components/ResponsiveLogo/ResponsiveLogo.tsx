import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Styles from "./styles";

function ResponsiveLogo() {
  return (
    <Styles.StyledLogoContainer>
      <Link href="/" passHref>
        <a>
          <Image
            width="250px"
            height="100px"
            layout="responsive"
            src="/logo_dooper_v2.png"
            alt="logo"
          />
        </a>
      </Link>
    </Styles.StyledLogoContainer>
  );
}

export default ResponsiveLogo;
