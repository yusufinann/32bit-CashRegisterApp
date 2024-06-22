import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import Receipt from './Receipt';
import { useCartContext } from '../contexts/CartContext';

const Ereceipt = ({ open, handleClose, handleSendReceipt, setEmail, email,t }) => {
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const { cart, totalAmount } = useCartContext();
  const productList = cart.flatMap((item) => [
    <div className="receipt-line" key={`${item.product.barcode}-1`}>
      <span>{item.product.barcode} ({item.quantity} × {item.product.price})</span>
    </div>,
    <div className="receipt-line" key={`${item.product.barcode}-2`}>
      <span>{item.product.name} - %{item.product.vat_rate}</span>
      <span>{(item.quantity * item.product.price).toFixed(2)} </span>
    </div>
  ]);

  // Ara toplam, KDV ve toplam tutarı hesapla
  const subTotal = cart.reduce((total, product) => total + (product.quantity * product.product.price), 0);
  const tax = subTotal * 0.18; // KDV oranı %18 olarak varsayalım
  const total = subTotal + tax;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('E-Receipt')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label={t('E-mail Address')}
          type="email"
          fullWidth
          value={email}
          onChange={handleChange}
        />
       <Receipt productList={productList} subTotal={subTotal} tax={tax} total={total} totalAmount={totalAmount}  />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">{t('Cancel')}</Button>
        <Button onClick={handleSendReceipt} color="primary">{t('Send')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Ereceipt;
