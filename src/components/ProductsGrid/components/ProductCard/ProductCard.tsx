import React from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "@src/types/SchemaDB";
import { StyledCard } from "./styles";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return product ? (
    <StyledCard raised>
      <CardMedia
        component="img"
        src={product?.image}
        width="150"
        alt={`producto ${product.id}`}
      />
      <CardContent>
        <Typography
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          variant="body1"
          color="text.secondary"
        >
          {product.title}
        </Typography>
        <Typography variant="h5">{product.price}</Typography>
      </CardContent>
    </StyledCard>
  ) : null;
}

export default ProductCard;
