import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React from "react";
import FormFeedbackDialog from "@src/components/FormFeedbackDialog";
import useFormConfig from "@src/hooks/useFormConfig";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import TextInput from "../TextInput";
import { StyledButton, Styledform } from "./styles";

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
  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    const { session, error } = await supabaseClient.auth.signIn({
      email,
      password
    });

    if (!!session) {
      return {
        status: "success",
        message: "Welcome! Now you can see your profile",
        actionText: "Go to profile"
      };
    }
    if (error) {
      return { status: "error", message: error.message };
    }
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
        redirectTo="/profile"
      />
    </Styledform>
  );
}

export default Login;
