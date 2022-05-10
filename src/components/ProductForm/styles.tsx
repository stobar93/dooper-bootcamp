import theme from "src/theme";
import { Avatar, styled } from "@mui/material";

export const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

export const CustomAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
  align-self: center;
  border: solid 2px ${theme.palette.primary.main};
`;
