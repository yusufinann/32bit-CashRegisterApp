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

function Receipt({ productList, subTotal, tax, totalAmount }) {
  return (
    <ReceiptContainer>
      <div className="receipt-header">
        <h2>ÖRNEK İŞLETME</h2>
        <p>DEMİRCİKARA MAH. 1431 SOK. NO:12</p>
        <p>0242 311 41 21</p>
        <p>ANTALYA</p>
      </div>
      <div className="receipt-line date">
        <span>TARİH : 07.05.2019</span>
        <span className="time">SAAT : 12:30</span>
      </div>
      <div className="receipt-line">
        <span>SATIŞ NO: 2</span>
        <span className="time">SATIŞ : NAKİT</span>
      </div>
      <div className="receipt-line">
        <span>KASİYER : AHMET</span>
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
        <span>100,00</span>
      </div>
      <div className="receipt-line">
        <span>PARA ÜSTÜ</span>
        <span>9,80</span>
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
}

export default Receipt;