import React from "react";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import { FormikProps } from "../../Input";
import { StyledInput } from "./styles";

type ImageInputProps = {
  field: FieldProps;
  formik: FormikProps;
};

function ImageInput({ field, formik }: ImageInputProps) {
  const { setFieldValue } = formik;

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setFieldValue(field.id, e.target.files[0]);
    }
  };

  return (
    <StyledInput
      id={field.id}
      name={field.id}
      type="file"
      disableUnderline
      onChange={handleImageChange}
    />
  );
}

export default ImageInput;
