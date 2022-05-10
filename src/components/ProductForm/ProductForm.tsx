import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Button, Typography } from "@mui/material";
import useFormConfig, {
  FieldProps
} from "@src/hooks/useFormConfig/useFormConfig";
import useImageStorage from "@src/hooks/useImageStorage";
import useMutateProduct from "@src/hooks/useMutateProduct";
import { Product } from "@src/types/SchemaDB";
import FormFeedbackDialog from "../FormFeedbackDialog";
import InputComponent from "../InputComponent";
import * as Styles from "./styles";

const fields: FieldProps[] = [
  {
    id: "title",
    initialValue: "",
    placeholder: "",
    label: "Title",
    validate: "text",
    required: true
  },
  {
    id: "description",
    initialValue: "",
    placeholder: "",
    label: "Description",
    validate: "text_long",
    required: true
  },
  {
    id: "price",
    initialValue: "",
    placeholder: "",
    label: "Price",
    validate: "number",
    required: true
  },
  {
    id: "image",
    initialValue: "",
    placeholder: "",
    label: "Image",
    validate: "file",
    required: true
  },
  {
    id: "published",
    initialValue: ["on"],
    placeholder: "",
    label: "Published",
    validate: "boolean",
    required: true
  }
];

interface ProductFormProps {
  initialProduct?: Product;
}

function ProductForm({ initialProduct }: ProductFormProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const { productMutate } = useMutateProduct();
  const imageMutation = useImageStorage();
  const queryClient = useQueryClient();

  const handleSubmit = (values: any) => {
    productMutate.mutate(values, {
      onSuccess: (data) => {
        return imageMutation.mutate(
          { image: data.image, productId: data.id },
          {
            onSuccess: () => {
              queryClient.invalidateQueries([
                "fetch-products",
                "authenticated",
                true,
                null,
                {
                  column: "created_at",
                  options: {
                    ascending: false
                  }
                }
              ]);
              setFormStatus({
                status: "success",
                message: "Operacion exitosa"
              });
              !initialProduct && resetForm();
            },
            onError: () => {
              setFormStatus({
                status: "error"
              });
            }
          }
        );
      }
    });
  };

  const formConfig = useFormConfig(fields, handleSubmit, initialProduct);
  const { setFormStatus, resetForm } = formConfig;

  useEffect(() => {
    formConfig.values.image instanceof File
      ? setImgUrl(URL.createObjectURL(formConfig.values.image))
      : setImgUrl(`${formConfig.values.image}?hash=${Math.random()}`);
  }, [formConfig.values.image]);

  return (
    <>
      <Typography variant="h6" align="center" m="10px 0">
        {`${!!initialProduct ? "Edit" : "Create"} product`}
      </Typography>
      <Styles.CustomAvatar
        alt={`product ${initialProduct ? initialProduct.id : null} image`}
        src={imgUrl}
      />
      <Styles.StyledForm onSubmit={formConfig.handleSubmit}>
        {fields.map((field) => (
          <InputComponent key={field.id} field={field} formik={formConfig} />
        ))}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={productMutate.isLoading}
        >
          Submit
        </Button>
        <FormFeedbackDialog
          formStatus={formConfig.formStatus}
          setFormStatus={formConfig.setFormStatus}
        />
      </Styles.StyledForm>
    </>
  );
}

export default ProductForm;
