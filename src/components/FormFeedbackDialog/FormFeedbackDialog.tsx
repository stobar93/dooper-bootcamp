import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { FormStatus } from "@src/hooks/useFormConfig/useFormConfig";

type DialogProps = {
  formStatus: FormStatus;
  setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
  redirectTo?: string;
};

const defaultDialogText = {
  loading: {
    title: "Loading",
    message: "Please wait..."
  },
  success: {
    title: "Success!",
    message: "Submit successful"
  },
  error: {
    title: "Something went wrong",
    message: "Please try again"
  },
  not_started: {
    title: "",
    message: ""
  }
};

function FormFeedbackDialog({
  formStatus,
  setFormStatus,
  redirectTo
}: DialogProps) {
  const [open, setOpen] = useState(false);
  const { status, message, actionText } = formStatus;

  useEffect(() => {
    setOpen(["loading", "success", "error"].includes(status));
  }, [status]);

  const router = useRouter();

  const handleClose = () => {
    if (status === "success" && redirectTo) {
      return router.push(redirectTo);
    }
    setOpen(false);
    setFormStatus({ status: "not_started" });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="alert-dialog-title">
        {defaultDialogText[status].title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {["success", "error"].includes(status) && message
            ? message
            : defaultDialogText[status].message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {["success", "error"].includes(status) ? (
          <Button onClick={handleClose} autoFocus>
            {actionText ? actionText : "OK"}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}

export default FormFeedbackDialog;
