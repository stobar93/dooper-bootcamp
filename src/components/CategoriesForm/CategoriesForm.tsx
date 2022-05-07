import React from "react";
import { useQueryClient } from "react-query";
import FormFeedbackDialog from "src/components/FormFeedbackDialog";
import InputComponent from "src/components/InputComponent";
import * as ProductFormStyles from "src/components/ProductForm/styles";
import useFormConfig, {
  FieldProps
} from "src/hooks/useFormConfig/useFormConfig";
import { Button, Typography } from "@mui/material";
import useMutateCategory from "@src/hooks/useMutateCategory";
import { Categories } from "@src/types/SchemaDB";

interface CategoriesFormProps {
  initialCategory?: Categories;
}

const fields: FieldProps[] = [
  {
    id: "title",
    initialValue: "",
    label: "Título",
    placeholder: "Ej: Tecnologia, hogar",
    validate: "text",
    required: true
  },
  {
    id: "description",
    initialValue: "",
    label: "Descripción",
    placeholder: "Describa brevemente la categoria",
    validate: "text_long",
    required: true
  }
];

function CategoriesForm({ initialCategory }: CategoriesFormProps) {
  const { categoryMutate } = useMutateCategory();
  const queryClient = useQueryClient();
  const handleSubmit = (values: any) => {
    categoryMutate.mutate(values, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", "authenticated"]);
        setFormStatus({
          status: "success",
          message: "Operacion exitosa"
        });
      },
      onError: () => {
        setFormStatus({
          status: "error"
        });
      }
    });
  };

  const formConfig = useFormConfig(fields, handleSubmit, initialCategory);
  const { setFormStatus } = formConfig;

  return (
    <>
      <Typography variant="h6" align="center" m="10px 0">
        {`${!!initialCategory ? "Edit" : "Create"} category`}
      </Typography>
      <ProductFormStyles.StyledForm onSubmit={formConfig.handleSubmit}>
        {fields.map((field) => (
          <InputComponent key={field.id} field={field} formik={formConfig} />
        ))}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={categoryMutate.isLoading}
        >
          Submit
        </Button>
        <FormFeedbackDialog
          formStatus={formConfig.formStatus}
          setFormStatus={formConfig.setFormStatus}
        />
      </ProductFormStyles.StyledForm>
    </>
  );
}

export default CategoriesForm;
