import { TextField, Toolbar, styled } from "@mui/material";
import theme from "@src/theme";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  position: sticky;
  top: ${theme.mixins.toolbar.minHeight}px;
  width: 100vw;
  background-color: ${theme.palette.background.default};
  box-shadow: 0px 2px 10px ${theme.palette.grey[500]};
`;

export const StyledTextField = styled(TextField)`
  width: 150px;
`;
