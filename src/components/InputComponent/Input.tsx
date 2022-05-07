import { FormikErrors, FormikTouched, FormikValues } from "formik";
import React, { ChangeEventHandler } from "react";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import ImageInput from "./components/ImageInput";
import SwitchInput from "./components/SwitchInput";
import TextInput from "./components/TextInput";

export type FormikProps = {
  values: FormikValues;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  handleChange: ChangeEventHandler;
  handleBlur: ChangeEventHandler;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<any>>;
};

type TextInputProps = {
  field: FieldProps;
  formik: FormikProps;
};

function Input({ field, formik }: TextInputProps) {
  if (field.validate === "boolean")
    return <SwitchInput formik={formik} field={field} />;

  if (field.validate === "text_long")
    return <TextInput field={field} formik={formik} isTextArea={true} />;

  if (field.validate === "file")
    return <ImageInput field={field} formik={formik} />;

  return <TextInput field={field} formik={formik} />;
}

export default Input;
