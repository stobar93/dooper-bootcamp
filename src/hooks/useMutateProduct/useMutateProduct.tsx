import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useMutation, useQueryClient } from "react-query";

function useMutateProduct() {
  const { user, error: authError } = useUser();
  const queryClient = useQueryClient();

  const upsertProduct = async (values: any) => {
    if (authError || !user) {
      throw new Error("Error de autenticacion");
    }

    const { image, published, ...valuesToUpdate } = values;

    const { data: newProduct, error } = await supabaseClient
      .from("product")
      .upsert(
        [
          {
            ...valuesToUpdate,
            published: Array.isArray(published) ? !!published[0] : published,
            created_by: user.id
          }
        ],
        { onConflict: "id" }
      )
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return { ...newProduct, image };
  };

  const deleteProduct = async (values: any) => {
    if (authError || !user) throw new Error("Error de autenticacion");

    const { data, error } = await supabaseClient
      .from("product")
      .delete()
      .eq("id", values.id);

    if (error) throw new Error(error.message);

    return data;
  };

  const productMutate = useMutation((values) => upsertProduct(values));
  const productDelete = useMutation((values) => deleteProduct(values), {
    onSuccess: () => {
      return queryClient.invalidateQueries(["fetch-products"]);
    }
  });
  return { productMutate, productDelete };
}

export default useMutateProduct;
