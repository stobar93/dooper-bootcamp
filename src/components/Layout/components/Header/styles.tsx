import { Toolbar, styled } from "@mui/material";
import theme from "@src/theme";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100vw;
  background-color: ${theme.palette.background.default};
`;
