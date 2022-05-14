import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useMutation, useQueryClient } from "react-query";

interface useImageStorageProps {
  image: File;
  productId: string;
}

function useImageStorage() {
  const { user, error: authError } = useUser();
  const queryClient = useQueryClient();

  const uploadImage = async (image: File, productId: string) => {
    if (authError || !user) {
      throw new Error("Error de autenticacion");
    }

    if (user) {
      const { data, error: uploadError } = await supabaseClient.storage
        .from("dooper-bootcamp")
        .upload(`products/${productId}.jpg`, image, {
          cacheControl: "3600",
          upsert: true,
          contentType: "image/jpg"
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      if (data) {
        const { data: updatedProduct, error: productUpdateError } =
          await supabaseClient
            .from("product")
            .update({
              image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.Key}`
            })
            .eq("id", productId)
            .maybeSingle();

        if (productUpdateError) throw new Error(productUpdateError.message);
        return updatedProduct;
      }
    }
  };

  const imageMutation = useMutation(
    ({ image, productId }: useImageStorageProps) =>
      uploadImage(image, productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetch-products"]);
      }
    }
  );
  return imageMutation;
}

export default useImageStorage;
