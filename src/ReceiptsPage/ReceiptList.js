import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../contexts/CartContext';
import { useLogin } from '../contexts/LoginContext';

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

const ReceiptList = () => {
    const { receipts } = useCartContext();
    const { user } = useLogin();
    if (receipts.length === 0) {
      return <p>Fiş listesi boş.</p>;
    }

    return (
      <>
        {receipts.map((receipt, index) => {
            return (
                <ReceiptContainer key={receipt.id || index}>
                    <div className="receipt-header">
                        <h2>ÖRNEK İŞLETME</h2>
                        <p>DEMİRCİKARA MAH. 1431 SOK. NO:12</p>
                        <p>0242 311 41 21</p>
                        <p>ANTALYA</p>
                    </div>
                    <div className="receipt-line date">
                        <span>TARİH : {new Date().toLocaleDateString("tr-TR")}</span>
                        <span className="time">SAAT : {new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="receipt-line">
                        <span>SATIŞ NO:{receipt.id}</span>
                        <span className="time">SATIŞ : {receipt.paymentType}</span>
                    </div>
                    <div className="receipt-line">
                        <span>KASİYER : {user.personelInfo.name}</span>
                    </div>
                    <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
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
                        <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
                       
                        <div className="receipt-line">
                            <span>ALINAN PARA</span>
                            <span>{receipt.receivedMoney}</span>
                        </div>
                        <div className="receipt-line">
                            <span>PARA ÜSTÜ</span>
                            <span>{receipt.changeGiven}</span>
                        </div>
                    </div>
                    
                    <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
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
