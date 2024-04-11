import React from "react";
import { styled } from "@mui/system";
import "./receipt.css";

const ReceiptContainer = styled("div")({
  fontFamily: "Arial, sans-serif",
  maxWidth: "320px",
  margin: "20px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});

const Receipt = React.forwardRef(({ productList, subTotal, tax, totalAmount }, ref) => {
  return (
    <ReceiptContainer ref={ref}>
      <div className="receipt-header">
        <h2>ÖRNEK İŞLETME</h2>
        <p>DEMİRCİKARA MAH. 1431 SOK. NO:12</p>
        <p>0242 311 41 21</p>
        <p>ANTALYA</p>
      </div>
      <div className="receipt-line date">
        <span>TARİH : null</span>
        <span className="time">SAAT : null</span>
      </div>
      <div className="receipt-line">
        <span>SATIŞ NO: null</span>
        <span className="time">SATIŞ : null</span>
      </div>
      <div className="receipt-line">
        <span>KASİYER : null</span>
      </div>
      <p className="receipt-line">
        <div className="divider">--------------------------------------------------------------------------------</div>
      </p>
      <div className="receipt-body">{productList}</div>
      <p className="receipt-line">
        <div className="divider">--------------------------------------------------------------------------------</div>
      </p>
      <div className="receipt-line">
        <span>ALINAN PARA</span>
        <span>null</span>
      </div>
      <div className="receipt-line">
        <span>PARA ÜSTÜ</span>
        <span>null</span>
      </div>
      <p className="receipt-line">
        <div className="divider">--------------------------------------------------------------------------------</div>
      </p>
      <div className="receipt-line">  
        <span>GENEL TOPLAM</span>
        <span>{totalAmount}</span>
      </div>
      <p className="receipt-line bottom">KDV FİŞİ DEĞİLDİR</p>
    </ReceiptContainer>
  );
});

export default Receipt;
