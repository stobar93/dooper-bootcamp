import React from "react";
import { List } from "@mui/material";
import { Categories } from "@src/types/SchemaDB";
import CategoryListItem from "./components/CategoryListItem";

interface CategoriesListProps {
  categories: Categories[];
}

function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <List>
      {categories?.map((category, index) => (
        <CategoryListItem key={`category-${category.id}`} category={category} />
      ))}
    </List>
  );
}

export default CategoriesList;
