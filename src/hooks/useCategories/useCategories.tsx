import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useQuery } from "react-query";
import { Categories } from "@src/types/SchemaDB";

interface UseCategoriesResult {
  categories: Categories[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

function useCategories(): UseCategoriesResult {
  const { user, error: authError } = useUser();

  const getCategories = async (): Promise<Categories[] | undefined> => {
    if (authError) {
      throw new Error("Error de autenticacion");
    }

    if (user) {
      const { data, error } = await supabaseClient
        .from("categories")
        .select("*");

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("No se encontro informacion");
      }

      return data;
    }
  };

  const {
    data: categories,
    isLoading,
    isError,
    isSuccess
  } = useQuery(["categories", user?.role], () => getCategories());

  return { categories, isLoading, isError, isSuccess };
}

export default useCategories;
