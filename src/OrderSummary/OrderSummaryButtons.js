
import React, { useState } from 'react';
import { Button, Container, Dialog, DialogTitle, DialogContent } from "@mui/material";

import { useGlobalContext } from '../contexts/GlobalContext';
import ReceiptList from '../ReceiptsPage/ReceiptList';
import TransactionPanel from '../SalesPage/TransactionPanel';
const OrderSummaryButtons = () => {
    const [open, setOpen] = useState(false); // Modal için state
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSaveAndShow = async () => {
      await saveReceipt();
      setOpen(true); // saveReceipt işlemi tamamlandıktan sonra modalı aç
    };

    const handleClose = () => {
      setOpen(false); // Modalı kapat
    };
    const {saveReceipt,totalAmount,receivedMoney } = useGlobalContext();
  

    if (receivedMoney - totalAmount < 0 && !isDisabled) {
      setIsDisabled(true);
    } else if (receivedMoney - totalAmount >= 0 && isDisabled) {
      setIsDisabled(false);
    }

    return (
      <Container>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={handleSaveAndShow}
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
              <ReceiptList />
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