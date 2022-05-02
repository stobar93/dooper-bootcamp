import { useState } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import ProductForm from "@src/components/ProductForm";
import ProductsTable from "@src/components/ProductsTable";
import useProducts from "@src/hooks/useGetProducts";

export default function AdminProductsPage() {
  const { products } = useProducts({
    ownProducts: true,
    order: { column: "created_at", options: { ascending: false } }
  });
  const [creatingNewProduct, setCreatingNewProduct] = useState<boolean>(false);
  const isProductListEmpty = products && !products[0];

  return (
    <Box
      padding="15px 0"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {isProductListEmpty && (
        <Typography variant="h4">
          Aun no tienes ningun producto. Crea el primero ahora
        </Typography>
      )}
      <Box padding="10px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreatingNewProduct(true)}
        >
          Crear producto
        </Button>
      </Box>
      {!isProductListEmpty && <ProductsTable products={products} />}
      <Dialog
        fullWidth
        onClose={() => setCreatingNewProduct(false)}
        open={creatingNewProduct}
      >
        <ProductForm />
      </Dialog>
    </Box>
  );
}
