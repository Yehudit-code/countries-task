import { useState } from "react";

type SnackbarSeverity = "success" | "error" | "info" | "warning";

export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] =
    useState<SnackbarSeverity>("success");

  const showSnackbar = (
    msg: string,
    type: SnackbarSeverity = "success"
  ) => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return {
    open,
    message,
    severity,
    showSnackbar,
    closeSnackbar,
  };
}