import React, { useState } from "react";
import CategoriesForm from "src/components/CategoriesForm";
import ConfirmDialog from "src/components/ProductsTable/components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Dialog,
  IconButton,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useMutateCategory from "@src/hooks/useMutateCategory";
import { Categories } from "@src/types/SchemaDB";

type CategoryListItemProps = {
  category: Categories;
};

function CategoryListItem({ category }: CategoryListItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { categoryDelete } = useMutateCategory();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async (values: any) => {
    categoryDelete.mutate(values);
  };

  return (
    <ListItem key={`category-${category.id}`}>
      <Box
        width="100%"
        display="inline-flex"
        flexDirection="row"
        justifyContent="space-between"
        boxShadow="0px 0px 2px 1px rgba(0, 0, 0, 0.2)"
        p="10px"
        columnGap={1}
      >
        <Box minWidth="150px">
          <ListItemText
            primary={category.title}
            secondary={category.description}
          />
        </Box>
        <Box display="flex" flexDirection={!downSm ? "row" : "column"}>
          <IconButton color="primary" onClick={() => setEditing(true)}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setDeleting(true)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Dialog fullWidth onClose={() => setEditing(false)} open={editing}>
        <CategoriesForm initialCategory={category} />
      </Dialog>
      <ConfirmDialog
        title={"Atencion"}
        open={deleting}
        setOpen={setDeleting}
        onConfirm={() => handleDelete({ id: category.id })}
      >
        <Typography variant="body1">
          ¿Estas seguro que quieres eliminar esta categoria?
        </Typography>
        <Typography variant="body1">
          Esta operacion no se puede deshacer
        </Typography>
      </ConfirmDialog>
    </ListItem>
  );
}

export default CategoryListItem;
