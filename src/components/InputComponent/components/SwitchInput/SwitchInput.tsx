import React from "react";
import { FormikProps } from "src/components/InputComponent/Input";
import { Switch } from "@mui/material";
import { FieldProps } from "@src/hooks/useFormConfig/useFormConfig";
import * as Styles from "./styles";

type SwitchInputProps = {
  field: FieldProps;
  formik: FormikProps;
};

function SwitchInput({ field, formik }: SwitchInputProps) {
  return (
    <Styles.StyledFormControlLabel
      label={field.label}
      name={field.id}
      id={field.id}
      control={
        <Switch
          checked={
            Array.isArray(formik.values[field.id])
              ? !!formik.values[field.id][0]
              : formik.values[field.id]
          }
          onChange={formik.handleChange}
        />
      }
      labelPlacement="start"
    />
  );
}

export default SwitchInput;
