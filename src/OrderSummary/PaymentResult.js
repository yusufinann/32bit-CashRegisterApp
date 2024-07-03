import React from 'react';
import './PaymentResult.css';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';

const PaymentResult = ({ t, paymentType, receivedMoney, Total, subTotal, changeGiven }) => {
  return (
    <div className="payment-result-card">
      <h2>{t('Payment Summary')}</h2>
      <div className="payment-info">
        <div>
          <ReceiptIcon />
          <span>{t('Payment Type')}</span> {paymentType}
        </div>
        <div>
          <PaymentIcon />
          <span>{t('Subtotal')}</span> {subTotal}
        </div>
        <div>
          <AttachMoneyIcon />
          <span>{t('Total Amount')}</span> {Total}
        </div>
        {paymentType !== 'Kredi Kartı' && (
          <div>
            <MonetizationOnIcon />
            <span>{t('Total Received')}</span> {receivedMoney}
          </div>
        )}
        {changeGiven > 0 && paymentType !== 'Kredi Kartı' && (
          <div className="change">
            <AttachMoneyIcon />
            <span>{t('Change Given')}:</span> {changeGiven}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
