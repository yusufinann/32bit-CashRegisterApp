import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import PaymentModal from "../PaymentModal";
import CampaignListModal from "../CampaignListModal";
import NumberPad from "./NumberPad";
import FunctionButtons from "./FunctionButtons";
import DisplayAndControls from "./DisplayAndControls";

const TransactionPanel = ({ theme, t, saveReceivedMoney, Total, input, setPaymentType, setInput, setPartialPayment, clearCart }) => {
  const navigate = useNavigate();
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const openCampaignModal = () => setIsCampaignModalOpen(true);
  const closeCampaignModal = () => setIsCampaignModalOpen(false);

  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  let remaining = parseFloat(Total) - parseFloat(input);

  const handleClick = (value) => setInput((prevInput) => prevInput + value);
  const handleClear = () => setInput("");
  const handleDeleteOne = () => setInput((prevInput) => prevInput.slice(0, -1));
  const handleSaveAndNavigate = async (paymentType) => {
    if ((input === "" || input === "0") && paymentType === "Kart") {
      setPaymentType("Kredi Kartı");
      navigate('/price');
      return;
    }
    if (input === "" || input === "0") {
      alert("Please enter a valid amount.");
      return;
    }
    setPaymentType(paymentType);
    if (parseFloat(input) < parseFloat(Total)) {
      setOpenModal(true);
      return;
    }
    await saveReceivedMoney();
    setPartialPayment(false);
    setInput("");
    navigate('/price');
  };
  const handlePayment = () => {
    saveReceivedMoney();
    setPartialPayment(true);
    setPaymentType(t("Cash&Card"));
    navigate('/price');
    setInput("");
  };
  const handleClose = () => {
    setOpenModal(false);
    clearCart();
  };

  return (
    <Grid container spacing={1} style={{ padding: 10, marginTop: "50px" }}>
      <DisplayAndControls
        theme={theme}
        input={input}
        t={t}
        handleSaveAndNavigate={handleSaveAndNavigate}
        openCampaignModal={openCampaignModal}
        handleDeleteOne={handleDeleteOne}
      />
      <FunctionButtons
        handleClear={handleClear}
        handleDeleteOne={handleDeleteOne}
        openCampaignModal={openCampaignModal}
        t={t}
      />
      <NumberPad handleClick={handleClick} />
      <PaymentModal
        open={openModal}
        handleClose={handleClose}
        remaining={remaining}
        Total={Total}
        handlePayment={handlePayment}
        clearCart={clearCart}
      />
      <CampaignListModal
        openCampaignModalFn={isCampaignModalOpen}
        closeCampaignModalFn={closeCampaignModal}
        theme={theme}
        t={t}
      />
    </Grid>
  );
};

export default TransactionPanel;
