import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { User, useUser } from "@supabase/supabase-auth-helpers/react";
import { useQuery } from "react-query";
import { Product } from "@src/types/SchemaDB";

interface UseGetProductsResult {
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface UseGetProductsProps {
  ownProducts?: boolean;
  published?: boolean;
  order?: {
    column: string;
    options: any;
  };
}

const buildQuery = (
  { ownProducts, published, order }: UseGetProductsProps,
  user: User
) => {
  let query = supabaseClient.from("product").select("*");

  if (ownProducts) query.eq("created_by", user.id);
  if (published !== undefined) query.eq("published", published);
  if (order !== undefined) query.order(order.column, { ...order.options });
  return query;
};

function useProducts({
  ownProducts = false,
  published,
  order
}: UseGetProductsProps): UseGetProductsResult {
  const { user, error: authError } = useUser();

  const getProducts = async (): Promise<Product[] | undefined> => {
    if (authError) {
      throw new Error("Error de autenticacion");
    }

    if (user) {
      const query = buildQuery({ ownProducts, published, order }, user);

      const { data, error: productsError } = await query;

      if (productsError) {
        throw new Error(productsError.message);
      }

      return data;
    }
  };

  const {
    data: products,
    isLoading,
    isError,
    isSuccess
  } = useQuery(
    ["fetch-products", user?.role, ownProducts, published, order],
    () => getProducts()
  );

  return { products, isLoading, isError, isSuccess };
}

export default useProducts;
