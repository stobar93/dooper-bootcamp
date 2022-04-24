import React from "react";
import * as Styles from "./styles";

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return <Styles.Container>{children}</Styles.Container>;
}

export default MainContainer;
