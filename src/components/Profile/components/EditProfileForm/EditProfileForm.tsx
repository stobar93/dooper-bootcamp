import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import FormFeedbackDialog from "@src/components/FormFeedbackDialog";
import TextInput from "@src/components/InputComponent/components/TextInput";
import useFormConfig from "@src/hooks/useFormConfig";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import { Profile } from "@src/types/SchemaDB";
import { StyledButton, Styledform } from "./styles";

const fields: FieldProps[] = [
  {
    id: "first_name",
    initialValue: "",
    placeholder: "",
    label: "First name",
    validate: "text",
    required: true
  },
  {
    id: "last_name",
    initialValue: "",
    placeholder: "",
    label: "Last name",
    validate: "text",
    required: true
  },
  {
    id: "email",
    initialValue: "",
    placeholder: "",
    label: "Email",
    validate: "email",
    required: true
  },
  {
    id: "phone_number",
    initialValue: "",
    placeholder: "",
    label: "Phone number",
    validate: "phone_number",
    required: true
  },
  {
    id: "city",
    initialValue: "",
    placeholder: "",
    label: "City",
    validate: "text"
  },
  {
    id: "state",
    initialValue: "",
    placeholder: "",
    label: "State",
    validate: "text"
  },
  {
    id: "country",
    initialValue: "",
    placeholder: "",
    label: "Country",
    validate: "text"
  },
  {
    id: "photo_url",
    initialValue: "",
    placeholder: "",
    label: "Photo URL",
    validate: "url"
  }
];

function EditProfileForm() {
  const [profile, setProfile] = useState<Profile | null>();

  const getProfile = async () => {
    let { data, error } = await supabaseClient
      .from("profile")
      .select(
        "id, email, first_name,last_name,phone_number, city, state, country, photo_url"
      )
      .maybeSingle();

    if (error) {
      return null;
    }

    return data;
  };

  useEffect(() => {
    const fetch = async () => {
      const profileInfo = await getProfile();
      setProfile(profileInfo);
    };

    fetch();
  }, []);

  const mappedFields = useMemo(() => {
    return fields.map((field) => {
      if (!profile) {
        return field;
      }
      const userInitialValue = profile
        ? profile[field.id as keyof Profile]
        : "";

      return {
        ...field,
        initialValue:
          typeof userInitialValue === "string" ? userInitialValue : ""
      };
    });
  }, [profile]);

  const handleSubmit = async (values: any) => {
    const { data, error } = await supabaseClient
      .from("profile")
      .update(values)
      .eq("id", profile?.id)
      .maybeSingle();

    if (error) {
      return { status: "error" };
    }
    if (data) {
      setProfile(data);
      return { status: "success" };
    }
  };

  const formConfig = useFormConfig(fields, handleSubmit, profile);

  return (
    <Styledform onSubmit={formConfig.handleSubmit}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {fields.map((field) => (
          <TextInput key={field.id} field={field} formik={formConfig} />
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {!formConfig.dirty || !formConfig.isValid ? (
          <StyledButton variant="outlined" disabled>
            Submit
          </StyledButton>
        ) : (
          <StyledButton type="submit" variant="contained">
            Submit
          </StyledButton>
        )}
      </Box>
      <FormFeedbackDialog
        formStatus={formConfig.formStatus}
        setFormStatus={formConfig.setStatus}
      />
    </Styledform>
  );
}

export default EditProfileForm;
