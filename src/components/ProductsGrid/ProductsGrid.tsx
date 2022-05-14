import React, { useState } from "react";
import ProductCard from "src/components/ProductsGrid/components/ProductCard";
import { Box, Dialog, DialogTitle } from "@mui/material";
import useGetProducts from "@src/hooks/useGetProducts";
import ProductsToolBar from "./components/ProductsToolBar";

export interface ProductFilters {
  category?: number;
}

function ProductsGrid() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const { products, isLoading } = useGetProducts({
    published: true,
    category: filters.category
  });

  return (
    <Box padding="0px">
      <ProductsToolBar filters={filters} setFilters={setFilters} />
      <Box
        minHeight="100vh"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        padding="15px 0"
      >
        {products?.map((product) => (
          <ProductCard key={`product-${product.id}`} product={product} />
        ))}
        {
          <Dialog open={isLoading}>
            <DialogTitle id="alert-dialog-title">Loading...</DialogTitle>
          </Dialog>
        }
      </Box>
    </Box>
  );
}

export default ProductsGrid;
