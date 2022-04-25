import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)`
  width: 220px;
  border-radius: 2%;
  margin: 5px;
  color: ${({ theme }) => theme.palette.primary.main};
  & > img {
    padding: 10px;
  }
`;
