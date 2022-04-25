import React from "react";
import ProductCard from "src/components/ProductsGrid/components/ProductCard";
import { Box, Dialog, DialogTitle } from "@mui/material";
import useProducts from "@src/hooks/useProducts";

function ProductsGrid() {
  const { products, isLoading } = useProducts();

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {products?.map((product) => (
        <ProductCard key={`product-${product.id}`} product={product} />
      ))}
      {
        <Dialog open={isLoading}>
          <DialogTitle id="alert-dialog-title">Loading...</DialogTitle>
        </Dialog>
      }
    </Box>
  );
}

export default ProductsGrid;
