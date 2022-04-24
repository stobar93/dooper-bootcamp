import React from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import * as Styles from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Styles.Element>
      <Header />
      <MainContainer>{children}</MainContainer>
    </Styles.Element>
  );
}

export default Layout;
