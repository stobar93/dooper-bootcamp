// import { useMemo } from "react";
import { ApiError } from "@supabase/supabase-js";
import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";

export type FieldTypes =
  | "text"
  | "password"
  | "email"
  | "phone_number"
  | "url"
  | "country_code";

export interface FieldProps {
  id: string;
  initialValue: string;
  placeholder: string;
  label: string;
  validate: FieldTypes;
  required?: boolean;
}

export type FormStatus = {
  status: "not_started" | "loading" | "success" | "error";
  error?: ApiError | null;
  message?: string;
  actionText?: string;
};

const objectFromArray = (fields: FieldProps[], key: keyof FieldProps) => {
  let mappedProps = fields.map((field) => {
    if (key !== "validate") {
      return [field.id, field[key]];
    }
    let validation = validationDictionary[field.validate];
    return [field.id, field.required ? validation.required() : validation];
  });

  return Object.fromEntries(mappedProps);
};

const validationDictionary = {
  text: string(),
  email: string().email("Please provide a valid email"),
  password: string()
    .matches(new RegExp(/(?=.*[a-z])/), "Must contain lowercase a-z characters")
    .matches(new RegExp(/(?=.*[A-Z])/), "Must contain uppercase A-Z characters")
    .matches(new RegExp(/(?=.*[0-9])/), "Must contain at least one number")
    .matches(
      new RegExp(/(?=.*[!@#$%^&*])/),
      "Must contain at least one !@#$%^&* special character"
    )
    .min(8, "Must be at least 8 characters long")
    .trim("Spaces are not allowed")
    .strict(),
  phone_number: string()
    .matches(new RegExp(/(^[0-9]+$)/), "Must contain only numbers")
    .min(10, "Must be at least 10 characters long"),
  url: string().url(),
  country_code: string().matches(new RegExp(/(^\+{1})([0-9]{1,3}$)/))
};

function useFormConfig(
  fields: FieldProps[],
  customHandleSubmit: (values: any) => any
) {
  const initialValues = objectFromArray(fields, "initialValue");
  const validationSchema = object(objectFromArray(fields, "validate"));
  const [formStatus, setFormStatus] = useState<FormStatus>({
    status: "not_started",
    message: ""
  });
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      setFormStatus({ status: "loading" });
      const submitResponse = await customHandleSubmit(values);
      setFormStatus(submitResponse);
      submitResponse.status === "success" && resetForm();
    },
    validationSchema,
    enableReinitialize: true
  });

  return { ...formik, formStatus, setFormStatus };
}

export default useFormConfig;
