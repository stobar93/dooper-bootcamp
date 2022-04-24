import React from "react";
import NavBar from "./components/NavBar";
import ResponsiveLogo from "./components/ResponsiveLogo";
import * as Styles from "./styles";

function Header() {
  return (
    <Styles.StyledToolbar>
      <ResponsiveLogo />
      <NavBar />
    </Styles.StyledToolbar>
  );
}

export default Header;
