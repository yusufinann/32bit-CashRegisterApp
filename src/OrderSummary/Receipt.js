import React from "react";
import { styled } from "@mui/system";
import "./receipt.css";
import { useGlobalContext } from "../contexts/GlobalContext";

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
  const {paymentType,receivedMoney} = useGlobalContext();
  const changeGiven = receivedMoney - totalAmount;
 
  return (
    <ReceiptContainer ref={ref}>
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
        <span className="time">SATIŞ : {paymentType}</span>
      </div>
      <div className="receipt-line">
        <span>KASİYER : AHMET</span>
      </div>
      <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
      <div className="receipt-body">{productList}</div>
      <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
      <div className="receipt-line">
        <span>ALINAN PARA</span>
        <span>{receivedMoney}</span>
      </div>
      <div className="receipt-line">
        <span>PARA ÜSTÜ</span>
        <span>{changeGiven}</span>
      </div>
      <div className="receipt-line divider">--------------------------------------------------------------------------------</div>
      <div className="receipt-line">  
        <span>GENEL TOPLAM</span>
        <span>{totalAmount}</span>
      </div>
      <div className="receipt-line bottom">KDV FİŞİ DEĞİLDİR</div>
    </ReceiptContainer>
  );
});

export default Receipt;

