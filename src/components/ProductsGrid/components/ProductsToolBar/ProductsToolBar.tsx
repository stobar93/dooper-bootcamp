import React from "react";
import { ProductFilters } from "src/components/ProductsGrid/ProductsGrid";
import useCategories from "src/hooks/useCategories";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import * as Styles from "./styles";

type ProductsToolDrawerProps = {
  children?: React.ReactNode;
  filters: ProductFilters;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
};

function ProductsToolBar({
  children,
  filters,
  setFilters
}: ProductsToolDrawerProps) {
  const { categories } = useCategories();

  return (
    <Styles.StyledToolbar>
      <Box display="inherit" alignItems="center" gap={1}>
        <Typography variant="body1">Filtrar:</Typography>
        <Styles.StyledTextField
          id="categoryFilter"
          name="categoryFilter"
          label="Categoria"
          type="text"
          select
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              category: Number(e.target.value)
            }))
          }
          value={!!filters.category ? filters.category : ""}
        >
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
        </Styles.StyledTextField>
        {!!filters.category && (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) =>
              setFilters((prev) => ({ ...prev, category: undefined }))
            }
          >
            Ver todo
          </Button>
        )}
      </Box>
      {children}
    </Styles.StyledToolbar>
  );
}

export default ProductsToolBar;
