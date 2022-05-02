import React from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import { Product } from "@src/types/SchemaDB";
import Header from "./components/Header";
import Row from "./components/Row";

type ProductsTableProps = {
  products: Product[] | undefined;
};

function ProductsTable({ products }: ProductsTableProps) {
  return (
    <TableContainer>
      <Table>
        <Header />
        <TableBody>
          {products &&
            products.map((product) => (
              <Row key={`row-${product.id}`} product={product} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;
