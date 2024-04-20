import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/GlobalContext';

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

const Divider = styled.div`
  content: "-------------------------------------------------------------------------------";
`;

const ReceiptList = () => {
    const { receipts } = useGlobalContext();
    return (
      <>
        {receipts.map((receipt, index) => (
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
        <span>SATIŞ NO: 2</span>
        <span className="time">SATIŞ : NAKİT</span>
      </div>
      <div className="receipt-line">
        <span>KASİYER : AHMET</span>
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
              <span>100.00</span>
            </div>
            <div className="receipt-line">
        <span>PARA ÜSTÜ</span>
        <span>9,80</span>
      </div>
            
            </div>
            
            <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
              
            <div className="receipt-line">
              <span>GENEL TOPLAM</span>
              <span>{receipt.total?.toFixed(2)}</span>
            </div>
            <div className="receipt-line bottom">KDV FİŞİ DEĞİLDİR</div>
          </ReceiptContainer>
        ))}
      </>
    );
};

export default ReceiptList;