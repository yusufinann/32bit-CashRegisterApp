import React from "react";
import Receipt from "./Receipt"; // Receipt bileşenini doğru şekilde import edin
import "./receipt.css";
import { Button } from "@mui/material";
import PrintedReceipt from "./PrintedReceipt";
import { useLogin } from "../contexts/LoginContext";
const ReceiptArea = ({ t,cart, paymentType, receivedMoney, partialPayment, saleId, Total, changeGiven }) => {
  
  
  const { user } = useLogin();

  // Cart dizisinden gelen verileri kullanarak HTML'i oluştur
  const productList = cart.flatMap((item) => (
    <React.Fragment key={item.product.barcode}>
      <div className="receipt-line">
        <span>
          {item.product.barcode} ({item.quantity} ×{" "}
          {item.product.price.toFixed(2)})
        </span>
      </div>
      <div className="receipt-line">
        <span>
          {item.product.name} - %{item.product.vat_rate}
        </span>
        <span>{item.totalPrice.toFixed(2)}</span>
      </div>
    </React.Fragment>
  ));

  // Ara toplam, KDV ve toplam tutarı hesapla
  const subTotal = cart
    .reduce(
      (total, product) => total + product.quantity * product.product.price,
      0
    )
    .toFixed(2);
  const tax = (subTotal * 0.08).toFixed(2); // KDV oranı %18 olarak varsayalım

  const handlePrint = () => {
    const printContents = PrintedReceipt({
      cart,
      saleId,
      paymentType,
      user,
      receivedMoney,
      partialPayment,
      Total,
      subTotal,
      tax,
    });

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(printContents);
    doc.close();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  return (
    <>
      {/* Yazdırma düğmesi */}
      <Button variant="outlined" onClick={handlePrint}>
        {t("Print Receipt")}
      </Button>

      {/* Görüntülenecek bileşen */}
      <Receipt
        productList={productList}
        subTotal={subTotal}
        tax={tax}
        paymentType={paymentType}
        receivedMoney={receivedMoney}
        partialPayment={partialPayment}
        saleId={saleId}
        Total={Total}
        user={user}
        changeGiven={changeGiven}
      />
    </>
  );
};

export default ReceiptArea;
