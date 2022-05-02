import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

type ConfirmDialogProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: CallableFunction;
};

function ConfirmDialog({
  title,
  children,
  open,
  setOpen,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
          }}
          color="secondary"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
          Si, continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
