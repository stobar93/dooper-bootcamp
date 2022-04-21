import { Button, css, styled } from "@mui/material";

export const Styledform = styled("form")`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 520px;
  ${({ theme }) => {
    return css`
      ${theme.breakpoints.down("md")} {
        max-width: 90%;
      }
    `;
  }}
`;

export const StyledButton = styled(Button)`
  margin: 10px;
  width: 50%;
  max-width: 300px;
`;
