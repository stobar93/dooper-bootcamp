import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useMutation, useQueryClient } from "react-query";

function useMutateCategory() {
  const { user, error: authError } = useUser();
  const queryClient = useQueryClient();

  const upsertCategory = async (values: any) => {
    if (authError || !user) {
      throw new Error("Error de autenticacion");
    }

    const { data: newCategory, error } = await supabaseClient
      .from("categories")
      .upsert([values], { onConflict: "id" })
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return newCategory;
  };

  const deleteCategory = async (values: any) => {
    if (authError || !user) throw new Error("Error de autenticacion");

    const { data, error } = await supabaseClient
      .from("categories")
      .delete()
      .eq("id", values.id);

    if (error) throw new Error(error.message);

    return data;
  };

  const categoryMutate = useMutation((values) => upsertCategory(values));
  const categoryDelete = useMutation((values) => deleteCategory(values), {
    onSuccess: () => {
      return queryClient.invalidateQueries(["categories", "authenticated"]);
    }
  });
  return { categoryMutate, categoryDelete };
}

export default useMutateCategory;
