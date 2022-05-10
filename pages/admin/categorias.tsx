import { useState } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import CategoriesForm from "@src/components/CategoriesForm";
import CategoriesList from "@src/components/CategoriesList";
import useCategories from "@src/hooks/useCategories";

export default function CategoriasPage() {
  const [creatingCategory, setCreatingCategory] = useState<boolean>(false);
  const { categories, isSuccess, isLoading } = useCategories();

  if (isSuccess && categories?.length === 0) {
    return (
      <Typography variant="h4">
        Aun no tienes ninguna categoria. Crea la primera ahora
      </Typography>
    );
  }

  if (isLoading) {
    return <Typography variant="h4">Cargando...</Typography>;
  }

  return (
    <>
      <Box padding="10px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreatingCategory(true)}
        >
          Nueva categoria
        </Button>
      </Box>
      {categories && <CategoriesList categories={categories} />}
      <Dialog
        open={creatingCategory}
        onClose={() => setCreatingCategory(false)}
        fullWidth
      >
        <CategoriesForm />
      </Dialog>
    </>
  );
}
