import React, { useState } from "react";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ReceiptArea from "./ReceiptArea";
import Ereceipt from "../OrderSummary/Ereceipt";
import PaymentResult from "./PaymentResult";
import { useTheme } from "../contexts/ThemeContext";
import OrderSummaryButtons from "./OrderSummaryButtons";
import { Button } from "@mui/material";

const OrderSummary = () => {
  const [open, setOpen] = useState(false); // Ereceipt bileşeninin açılıp kapanmasını kontrol eden state
  const [email, setEmail] = useState(""); // setEmail fonksiyonunu tanımlayın
  const { theme } = useTheme();

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
          <ReceiptArea />
        </div>
        <div className={`paper-container ${themeClass}`}>
          <PaymentResult />
        </div>
        <div className={`paper-container ${themeClass}`}>
          <div className={`panel ${themeClass}`}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenEreceipt}
            >
              E-Receipt
            </Button>
            <OrderSummaryButtons />
          </div>
        </div>
      </div>
      <Ereceipt
        open={open}
        handleClose={handleCloseEreceipt}
        handleSendReceipt={handleSendReceipt}
        setEmail={setEmail}
        email={email}
      />
    </div>
  );
};

export default OrderSummary;
