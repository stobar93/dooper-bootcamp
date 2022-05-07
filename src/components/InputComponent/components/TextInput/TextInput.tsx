import React from "react";
import { FormikProps } from "src/components/InputComponent/Input";
import { TextField } from "@mui/material";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";

type TextInputProps = {
  field: FieldProps;
  formik: FormikProps;
  isNumber?: boolean;
  isTextArea?: boolean;
};

function TextInput({
  field,
  formik,
  isNumber = false,
  isTextArea = false
}: TextInputProps) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <TextField
      error={touched[field.id] && !!errors[field.id]}
      id={field.id}
      label={field.label}
      type={field.validate === "password" ? "password" : "text"}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={(touched[field.id] && errors[field.id]) ?? null}
      placeholder={field.placeholder}
      margin="normal"
      value={values[field.id]}
      inputProps={
        isNumber ? { inputMode: "numeric", pattern: "[0-9]*" } : undefined
      }
      multiline={isTextArea}
      maxRows={isTextArea ? 10 : 1}
      minRows={isTextArea ? 5 : 1}
    />
  );
}

export default TextInput;
