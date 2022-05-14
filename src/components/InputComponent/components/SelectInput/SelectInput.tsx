import React from "react";
import { FormikProps } from "src/components/InputComponent/Input";
import { MenuItem, TextField } from "@mui/material";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";

interface Option {
  id: any;
  title: string;
}

interface SelectInputProps {
  field: FieldProps;
  formik: FormikProps;
  options: Option[] | undefined;
}

function SelectInput({ field, formik, options }: SelectInputProps) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <TextField
      error={touched[field.id] && !!errors[field.id]}
      id={field.id}
      name={field.id}
      label={field.label}
      select
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={(touched[field.id] && errors[field.id]) ?? null}
      placeholder={field.placeholder}
      margin="normal"
      value={values[field.id]}
    >
      {options &&
        options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
    </TextField>
  );
}

export default SelectInput;
