import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PaymentModal = ({ open, handleClose, remaining, handlePayment }) => {
  const{t}=useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor: "#0E3F57", color: "white" }}>{t('Insufficient Balance')}!</DialogTitle>
      <DialogContent>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>{t('Remaining Balance')}: {remaining}</Typography>
        <Typography variant="body1" style={{ marginBottom: "20px" }}>{t('Would you like to pay by Credit Card')}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained" style={{ marginRight: "10px" }}>{t('Order Cancel')}</Button>
        <Button onClick={handlePayment} color="secondary" variant="contained">{('Pay with Card')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
