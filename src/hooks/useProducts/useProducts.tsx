import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useQuery } from "react-query";

function useProducts() {
  const { user, error: authError } = useUser();

  const getProducts = async () => {
    if (authError) {
      throw new Error("Error de autenticacion");
    }

    if (user) {
      const { data, error: productsError } = await supabaseClient
        .from("product")
        .select("*")
        .eq("published", true);

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
  } = useQuery(["fetch-products", user?.role], () => getProducts());

  return { products, isLoading, isError, isSuccess };
}

export default useProducts;
