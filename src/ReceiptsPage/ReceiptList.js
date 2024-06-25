import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../contexts/CartContext';
import { useLogin } from '../contexts/LoginContext';
import '../OrderSummary/receipt.css';

const ReceiptContainer = styled("div")`
  font-family: "Arial, sans-serif";
  max-width: 320px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Divider = styled("div")`
  border-top: 1px dashed #000;
  margin: 10px 0;
`;

const ReceiptList = () => {
  const { receipts,partialPayment,setPaymentType } = useCartContext();
  const { user } = useLogin();
  if (partialPayment) {
    setPaymentType("Card&Cash");
  } 
  if (receipts.length === 0) {
    return <p>Fiş listesi boş.</p>;
  }


  return (
    <>
      {receipts.map((receipt, index) => {
        return (
          <ReceiptContainer key={receipt.id || index} style={{ color: "black" }}>
            <div className="receipt-header">
              <h2>ÖRNEK İŞLETME</h2>
              <p>DEMİRCİKARA MAH. 1431 SOK. NO:12</p>
              <p>0242 311 41 21</p>
              <p>ANTALYA</p>
            </div>
            <div className="receipt-line date">
              <span>TARİH : {new Date().toLocaleDateString("tr-TR")}</span>
              <span className="time">
                SAAT : {new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="receipt-line">
              <span>SATIŞ NO: {receipt.id}</span>
              <span className="time">SATIŞ : {receipt.paymentType}</span>
            </div>
            <div className="receipt-line">
              {user && user.personelInfo && (
                <span>KASİYER : {user.personelInfo.name}</span>
              )}
            </div>
            <Divider />
            <div className="receipt-body">
              {receipt.items.map((item, itemIndex) => (
                <React.Fragment key={item.id || itemIndex}>
                  <div className="receipt-line">
                    <span>{item.barcode} ({item.quantity} × {item.unitPrice?.toFixed(2)})</span>
                  </div>
                  <div className="receipt-line">
                    <span>{item.productName} - %{item.vat_rate}</span>
                    <span>{item.totalPrice?.toFixed(2)}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Divider />
            {partialPayment ? (
              <>
                <div className="receipt-line">
                  <span>Kart ile ödenen</span>
                  <span>{(receipt.total - receipt.receivedMoney).toFixed(2)}</span>
                </div>
                <div className="receipt-line">
                  <span>Nakit ile ödenen</span>
                  <span>{receipt.receivedMoney}</span>
                </div>
              </>
            ) : receipt.paymentType === "Kredi Kartı" ? (
              <div className="receipt-line">
                <span>Ödeme Tipi: Kredi Kartı</span>
              </div>
            ) : (
              <>
                <div className="receipt-line">
                  <span>ALINAN PARA</span>
                  <span>{receipt.receivedMoney}</span>
                </div>
                <div className="receipt-line">
                  <span>PARA ÜSTÜ</span>
                  <span>{receipt.changeGiven}</span>
                </div>
              </>
            )}
            <Divider />
            <div className="receipt-line">
              <span>ARA TOPLAM</span>
              <span>{receipt.subTotal}</span>
            </div>
            <div className="receipt-line">
              <span>GENEL TOPLAM</span>
              <span>{receipt.total}</span>
            </div>
            <div className="receipt-line bottom">KDV FİŞİ DEĞİLDİR</div>
          </ReceiptContainer>
        );
      })}
    </>
  );
};

export default ReceiptList;
