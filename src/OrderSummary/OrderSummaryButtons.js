
import React, { useState } from 'react';
import { Button, Container, Dialog, DialogTitle, DialogContent } from "@mui/material";

import { useGlobalContext } from '../contexts/GlobalContext';
import ReceiptArea from '../OrderSummary/ReceiptArea';
import TransactionPanel from '../SalesPage/TransactionPanel';
import { useNavigate } from 'react-router-dom';
const OrderSummaryButtons = () => {
    const [open, setOpen] = useState(false); // Modal için state
    const [isDisabled, setIsDisabled] = useState(false);
    const {Total, receivedMoney, clearCart,saveReceipt } = useGlobalContext();
    const navigate = useNavigate();

    const handleClose = () => {
      saveReceipt();
      setOpen(false);
      navigate('/sales');
      clearCart(); // Clear cart array using the function from GlobalContext

    };
   

    if (receivedMoney - Total  < 0 && !isDisabled) {
      setIsDisabled(true);
  } else if (receivedMoney - Total  >= 0 && isDisabled) {
      setIsDisabled(false);
  }


    return (
      <Container>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={() => setOpen(true)}
          >
            Belge Bitir
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="receipt-dialog-title"
          >
            <DialogTitle id="receipt-dialog-title">Receipt List</DialogTitle>
            <DialogContent>
            <ReceiptArea />
            </DialogContent>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </Dialog>
          <div style={{ display: "flex", justifyContent: "space-between", margin: 20 }}>
         <TransactionPanel/>
       </div>

        </div>
      </Container>
    );
}

export default OrderSummaryButtons;