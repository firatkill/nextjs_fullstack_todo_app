"use client";
import { useGlobalStore } from "@/zustand/globalStore";
import { Alert, Snackbar } from "@mui/material";

export default function SnackbarComponent() {
  const snackbarOptions = useGlobalStore((state) => state.snackbarOptions);
  const closeSnackbar = useGlobalStore((state) => state.closeSnackbar);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeSnackbar();
  };

  return (
    <Snackbar
      open={snackbarOptions.open}
      onClose={handleClose}
      autoHideDuration={parseInt(snackbarOptions.autoHideDuration)}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarOptions.alert.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarOptions.alert.text}
      </Alert>
    </Snackbar>
  );
}
