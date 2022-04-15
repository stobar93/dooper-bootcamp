import React from "react";
import Button from "@mui/material/Button";
import useFormConfig from "@src/hooks/useFormConfig";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import TextInput from "../TextInput";
import { Styledform } from "./styles";

const fields: FieldProps[] = [
  {
    id: "email",
    initialValue: "",
    placeholder: "",
    label: "Email",
    validate: "email",
    required: true
  },
  {
    id: "password",
    initialValue: "",
    placeholder: "",
    label: "Password",
    validate: "password",
    required: true
  }
];

function Login() {
  const formik = useFormConfig(fields);

  return (
    <Styledform onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <TextInput key={field.id} field={field} formik={formik} />
      ))}
      {!formik.dirty || !formik.isValid ? (
        <Button variant="outlined" disabled>
          Submit
        </Button>
      ) : (
        <Button type="submit" variant="contained">
          Submit
        </Button>
      )}
    </Styledform>
  );
}

export default Login;
