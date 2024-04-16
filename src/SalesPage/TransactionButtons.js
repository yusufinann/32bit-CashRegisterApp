import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import "./styles.css";
import TransactionPanel from "./TransactionPanel";
import ModalSearch from "./ModalSearch";
import CampaignListModal from "./CampaignListModal";

const TransactionButtons = () => {
    // Modalın açık/kapalı durumunu kontrol eden state
    const [openModal, setOpenModal] = useState(false);

    // Modalı açan fonksiyon
    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    // Modalı kapatan fonksiyon
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  return (
    <Container>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          isimden Ara
        </Button>
        <Button variant="contained" color="success">
          Satıcı
        </Button>
        <Button variant="contained" color="error">
          A101 Hadi
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <Button variant="contained" color="primary">
          Taksitli
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 20,
        }}
      >
        <Button variant="contained" color="primary">
          Belge İptal
        </Button>
        <Button variant="contained" color="success">
          Satır İptal
        </Button>
        <Button variant="contained" color="error">
          Taksitli
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <TransactionPanel />
      </div>
      <ModalSearch open={openModal} handleClose={handleCloseModal} />
      <CampaignListModal/> 
    </Container>
  );
};

export default TransactionButtons;
