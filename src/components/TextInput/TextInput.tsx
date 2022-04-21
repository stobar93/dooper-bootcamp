import { FormikErrors, FormikTouched, FormikValues } from "formik";
import React, { ChangeEventHandler } from "react";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import { StyledTextField } from "./styles";

type FormikProps = {
  values: FormikValues;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  handleChange: ChangeEventHandler;
  handleBlur: ChangeEventHandler;
};

type TextInputProps = {
  field: FieldProps;
  formik: FormikProps;
};

function TextInput({ field, formik }: TextInputProps) {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  return (
    <StyledTextField
      error={touched[field.id] && !!errors[field.id]}
      id={field.id}
      label={field.label}
      type={field.id === "password" ? "password" : "text"}
      defaultValue={values[field.id]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={(touched[field.id] && errors[field.id]) ?? null}
      placeholder={field.placeholder}
      margin="normal"
    />
  );
}

export default TextInput;
