import React, { useRef } from "react";
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
  color: "black",
});

const Receipt = ({ productList, tax, subTotal, paymentType, receivedMoney, partialPayment, saleId, Total, user,changeGiven }) => {
  const receiptRef = useRef(null);

 

  return (
    <ReceiptContainer className="receipt-container" ref={receiptRef}>
      <div className="receipt-header">
        <h2>ÖRNEK İŞLETME</h2>
        <p>DEMİRCİKARA MAH. 1431 SOK. NO:12</p>
        <p>0242 311 41 21</p>
        <p>ANTALYA</p>
      </div>
      <div className="receipt-line date">
        <span>TARİH : {new Date().toLocaleDateString("tr-TR")}</span>
        <span className="time">
          SAAT :{" "}
          {new Date().toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="receipt-line">
        <span>SATIŞ NO: {saleId}</span>
        <span className="time">SATIŞ : {paymentType}</span>
      </div>
      <div className="receipt-line">
        {/* Güvenlik kontrolü ekleyelim */}
        {user && user.personelInfo && (
          <span>KASİYER : {user.personelInfo.name}</span>
        )}
      </div>
      <div className="receipt-line divider">
        --------------------------------------------------------------------------------
      </div>
      <div className="receipt-body">{productList}</div>
      <div className="receipt-line divider">
        --------------------------------------------------------------------------------
      </div>
      {paymentType === "Kredi Kartı" ? (
        <div>
          <div className="receipt-line">
            <span>Ödeme Tipi</span>
            <span>Kredi Kartı</span>
          </div>
          <div className="receipt-line">
            <span>ARA TOPLAM</span>
            <span>{subTotal}</span>
          </div>
          <div className="receipt-line">
            <span>GENEL TOPLAM</span>
            <span>{Total}</span>
          </div>
        </div>
      ) : (
        <div>
          {partialPayment ? (
            <div>
              <div className="receipt-line">
                <span>Kart ile ödenen</span>
                <span>{(Total - receivedMoney).toFixed(2)}</span>
              </div>
              <div className="receipt-line">
                <span>Nakit ile ödenen</span>
                <span>{receivedMoney}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="receipt-line">
                <span>ALINAN PARA</span>
                <span>{receivedMoney}</span>
              </div>
              <div className="receipt-line">
                <span>PARA ÜSTÜ</span>
                <span>{changeGiven}</span>
              </div>
            </div>
          )}
          <div className="receipt-line divider">
            --------------------------------------------------------------------------------
          </div>
          <div className="receipt-line">
            <span>ARA TOPLAM</span>
            <span>{subTotal}</span>
          </div>
          <div className="receipt-line">
            <span>KDV</span>
            <span>{tax}</span>
          </div>
          <div className="receipt-line">
            <span>GENEL TOPLAM</span>
            <span>{Total}</span>
          </div>
        </div>
      )}
      <div className="receipt-line bottom">KDV FİŞİ DEĞİLDİR</div>
    </ReceiptContainer>
  );
};

export default Receipt;
