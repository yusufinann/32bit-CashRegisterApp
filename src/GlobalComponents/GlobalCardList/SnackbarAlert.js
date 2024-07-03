import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, handleClose, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={1000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert
      onClose={handleClose}
      severity="success"
      sx={{ width: "300px", fontSize: "1.2rem" }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
