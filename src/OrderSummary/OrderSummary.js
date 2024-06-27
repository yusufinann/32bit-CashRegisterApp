import React, { useState } from "react";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ReceiptArea from "./ReceiptArea";
import Ereceipt from "../OrderSummary/Ereceipt";
import PaymentResult from "./PaymentResult";
import { useTheme } from "../contexts/ThemeContext";
import OrderSummaryButtons from "./OrderSummaryButtons";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCartContext } from "../contexts/CartContext";

const OrderSummary = () => {
  const {
    cart,
    paymentType,
    receivedMoney,
    partialPayment,
    saleId,
    Total,
    changeGiven,
    email,
    setEmail
  } = useCartContext();

  const [open, setOpen] = useState(false); // Ereceipt bileşeninin açılıp kapanmasını kontrol eden state
  const { theme } = useTheme();
  const { t } = useTranslation();
  const handleOpenEreceipt = () => {
    setOpen(true); // Ereceipt bileşenini aç
  };

  const handleCloseEreceipt = () => {
    setOpen(false); // Ereceipt bileşenini kapat
  };

  const handleSendReceipt = () => {
    console.log("E-receipt sent to:", email);
    setOpen(false);
  };

  const themeClass =
    theme === "dark" ? "item-container dark" : "item-container light";
  const maincontainer =
    theme === "dark" ? "Main-container dark" : "Main-container light";

  return (
    <div className={`Main-container ${maincontainer}`}>
      <div>
        <GlobalNavi title="See Price" linkTo="/sales" />
      </div>
      <div className="grid-container">
        <div className={`paper-container ${themeClass}`}>
          <ReceiptArea
            t={t}
            cart={cart}
            paymentType={paymentType}
            receivedMoney={receivedMoney}
            partialPayment={partialPayment}
            saleId={saleId}
            Total={Total}
            changeGiven={changeGiven}
          />
        </div>
        <div className={`paper-container ${themeClass}`}>
          <PaymentResult t={t} />
        </div>
        <div className={`paper-container ${themeClass}`}>
          <div className={`panel ${themeClass}`}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenEreceipt}
            >
              {t("E-Receipt")}
            </Button>
            <OrderSummaryButtons
              t={t}
              cart={cart}
              paymentType={paymentType}
              receivedMoney={receivedMoney}
              partialPayment={partialPayment}
              saleId={saleId}
              Total={Total}
              changeGiven={changeGiven}
            />
          </div>
        </div>
      </div>
      <Ereceipt
        open={open}
        handleClose={handleCloseEreceipt}
        handleSendReceipt={handleSendReceipt}
        setEmail={setEmail}
        email={email}
        cart={cart}
        paymentType={paymentType}
        receivedMoney={receivedMoney}
        partialPayment={partialPayment}
        saleId={saleId}
        Total={Total}
        changeGiven={changeGiven}
        t={t}
      />
    </div>
  );
};

export default OrderSummary;
