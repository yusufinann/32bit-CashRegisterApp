import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import "./styles.css";
import TransactionPanel from "./TransactionPanel";
import ModalSearch from "./ModalSearch";
import CampaignListModal from "./CampaignListModal";

const TransactionButtons = () => {
    // Modalın açık/kapalı durumunu kontrol eden state
    const [openSearchModal, setOpenSearchModal] = useState(false);
   
    const handleOpenSearchModal = () => setOpenSearchModal(true);
    const handleCloseSearchModal = () => setOpenSearchModal(false);
 
  return (
    <Container>
       <div style={{ display: "flex",flexDirection:"row" ,justifyContent: "space-between", margin: 20 }}>
         
         <div>
         <Button variant="contained" color="primary" onClick={handleOpenSearchModal}>isimden Ara</Button>
          </div>
         <div>
         <Button variant="contained" color="primary" >Button</Button>
       </div>
       <div>
         <Button variant="contained" color="primary">Belge İptal</Button>
       </div>
       </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <TransactionPanel />
      </div>
      <ModalSearch open={openSearchModal} handleClose={handleCloseSearchModal} />
      <CampaignListModal/> 
    </Container>
  );
};

export default TransactionButtons;
