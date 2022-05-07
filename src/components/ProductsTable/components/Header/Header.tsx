import React from "react";
import { TableCell, TableHead } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type HeaderProps = {};

function Header({}: HeaderProps) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableHead>
      <TableCell align="center">Publicar</TableCell>
      <TableCell align="center">Imagen</TableCell>
      <TableCell align="center">Titulo</TableCell>
      {!downSm && <TableCell align="center">Precio</TableCell>}
      {!downMd && <TableCell align="center">Descripcion</TableCell>}
      <TableCell align="center"></TableCell>
    </TableHead>
  );
}

export default Header;
