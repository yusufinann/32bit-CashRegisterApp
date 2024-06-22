import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ReceiptArea from "../OrderSummary/ReceiptArea";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import ReceivedProducts from "./ReceivedProducts";
import './OrderSummary.css'
const OrderSummaryButtons = ({t}) => {
  const [open, setOpen] = useState(false);
  const { clearCart, saveReceipt } = useCartContext();

  const navigate = useNavigate();

  const handleClose = () => {
    saveReceipt();
    setOpen(false);
    navigate("/sales");
    clearCart(); // Clear cart array using the function from GlobalContext
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
      {t('Finish Document')}
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="receipt-dialog-title"
        >
          <DialogTitle id="receipt-dialog-title">{t('Receipt List')}</DialogTitle>
          <DialogContent>
            <ReceiptArea t={t}/>
          </DialogContent>
          <Button onClick={handleClose} color="primary">
            {t('Close')}
          </Button>
        </Dialog>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <ReceivedProducts />
        </div>
      </div>
    </Container>
  );
};

export default OrderSummaryButtons;
