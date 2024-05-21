import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const PaymentModal = ({ open, handleClose, remaining, handlePayment }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ backgroundColor: "#0E3F57", color: "white" }}>Yetersiz Bakiye!</DialogTitle>
      <DialogContent>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>Kalan Bakiye: {remaining}</Typography>
        <Typography variant="body1" style={{ marginBottom: "20px" }}>Kredi Kartı ile ödemek ister misiniz?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained" style={{ marginRight: "10px" }}>Sipariş İptal</Button>
        <Button onClick={handlePayment} color="secondary" variant="contained">Kart ile Öde</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
