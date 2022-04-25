import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React from "react";
import FormFeedbackDialog from "@src/components/FormFeedbackDialog";
import useFormConfig from "@src/hooks/useFormConfig";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import TextInput from "../TextInput";
import { StyledButton, Styledform } from "./styles";

const fields: FieldProps[] = [
  {
    id: "first_name",
    initialValue: "",
    placeholder: "John",
    label: "First name",
    validate: "text",
    required: true
  },
  {
    id: "last_name",
    initialValue: "",
    placeholder: "Doe",
    label: "Last name",
    validate: "text",
    required: true
  },
  {
    id: "email",
    initialValue: "",
    placeholder: "youremail@domain.com",
    label: "Email",
    validate: "email",
    required: true
  },
  {
    id: "password",
    initialValue: "",
    placeholder: "********",
    label: "Password",
    validate: "password",
    required: true
  }
];

const isNewUser = async (userEmail: string) => {
  const { data } = await supabaseClient
    .from("profile")
    .select("id")
    .eq("email", userEmail);
  return data?.length === 0;
};

function Register() {
  const handleSubmit = async (values: any) => {
    const { email, password, firstName, lastName } = values;
    const isNewSignUp = await isNewUser(email);

    if (isNewSignUp) {
      const { user, error } = await supabaseClient.auth.signUp(
        {
          email,
          password
        },
        {
          data: {
            first_name: firstName,
            last_name: lastName
          },
          redirectTo: window.location.origin
        }
      );

      if (error)
        return {
          status: "error",
          error: error,
          message: error.message
        };

      if (user)
        return {
          status: "success",
          message: "Please check your inbox to verify your email"
        };
    }

    return {
      status: "error",
      message: "The user is already registered"
    };
  };

  const formConfig = useFormConfig(fields, handleSubmit);

  return (
    <Styledform onSubmit={formConfig.handleSubmit}>
      {fields.map((field) => (
        <TextInput key={field.id} field={field} formik={formConfig} />
      ))}
      <StyledButton
        type="submit"
        variant="contained"
        disabled={
          !formConfig.dirty || !formConfig.isValid || formConfig.isSubmitting
        }
      >
        Submit
      </StyledButton>
      <FormFeedbackDialog
        formStatus={formConfig.formStatus}
        setFormStatus={formConfig.setStatus}
        redirectTo="/"
      />
    </Styledform>
  );
}

export default Register;
