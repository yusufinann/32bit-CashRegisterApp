import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ReceiptArea from './ReceiptArea';

const Ereceipt = ({ open, handleClose, handleSendReceipt, setEmail, email, t, cart, paymentType,receivedMoney,partialPayment,saleId,Total,changeGiven }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('E-Receipt')}</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email">{t('E-mail Address')}</label>
          <input
            autoFocus
            margin="dense"
            id="email"
            type="text"
            value={email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '8px' }}
          />
        </div>
        <ReceiptArea t={t} cart={cart} paymentType={paymentType} receivedMoney={receivedMoney} partialPayment={partialPayment} saleId={saleId} Total={Total} changeGiven={changeGiven}/>
        </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">{t('Cancel')}</Button>
        <Button onClick={handleSendReceipt} color="primary">{t('Send')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Ereceipt;
