import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React, { useEffect, useState } from "react";
import ProductForm from "src/components/ProductForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Dialog,
  IconButton,
  Switch,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useMutateProduct from "@src/hooks/useMutateProduct";
import { Product } from "@src/types/SchemaDB";
import ConfirmDialog from "../ConfirmDialog";

type RowProps = {
  product: Product;
};

function Row({ product }: RowProps) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [productInfo, setProductInfo] = useState(product);

  useEffect(() => setProductInfo(product), [product]);

  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { productDelete } = useMutateProduct();

  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedValue = event.target.checked;
    setProductInfo((prev) => ({ ...prev, published: newCheckedValue }));

    const { data, error } = await supabaseClient
      .from("product")
      .update({ published: newCheckedValue })
      .eq("id", productInfo.id);

    if (error) {
      setProductInfo((prev) => ({ ...prev, published: !newCheckedValue }));
    }
  };

  const handleDelete = async (values: any) => {
    return productDelete.mutate(values);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="center">
          <Switch
            checked={productInfo.published}
            onChange={handleSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
        </TableCell>
        <TableCell align="center">
          <Avatar
            alt={`product ${productInfo.id} image`}
            src={productInfo.image}
          />
        </TableCell>

        <TableCell align="left">
          <Typography variant="body2" minWidth={downSm ? "100px" : "200px"}>
            {productInfo.title}
          </Typography>
        </TableCell>
        {!downSm && <TableCell align="center">{productInfo.price}</TableCell>}
        {!downMd && (
          <TableCell align="left">
            <Typography overflow="hidden" variant="body2" noWrap width="200px">
              {productInfo.description}
            </Typography>
          </TableCell>
        )}
        <TableCell width="min-content" align="center">
          <Box display="flex" flexDirection={!downSm ? "row" : "column"}>
            <IconButton color="primary" onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => setDeleting(true)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <Dialog fullWidth onClose={() => setEditing(false)} open={editing}>
        <ProductForm initialProduct={product} />
      </Dialog>
      <ConfirmDialog
        title={"Atencion"}
        open={deleting}
        setOpen={setDeleting}
        onConfirm={() => handleDelete({ id: productInfo.id })}
      >
        <Typography variant="body1">
          ¿Estas seguro que quieres eliminar este producto?
        </Typography>
        <Typography variant="body1">
          Esta operacion no se puede deshacer
        </Typography>
      </ConfirmDialog>
    </>
  );
}

export default Row;
