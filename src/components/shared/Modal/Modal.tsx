import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export interface ModalProps extends DialogProps {
  title?: string;
}

const Modal = (props: ModalProps) => {
  const { open, onClose, children, title, ...delegated } = props;

  return (
    <Dialog open={open} onClose={onClose} {...delegated}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};

export default Modal;
