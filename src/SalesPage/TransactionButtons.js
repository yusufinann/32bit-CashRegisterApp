import React, { useState } from "react";
import { Alert, Button, Container, Snackbar } from "@mui/material";
import "./styles.css";
import TransactionPanel from "./TransactionPanel";
import ModalSearch from "./ModalSearch";
import CampaignListModal from "./CampaignListModal";
import { useCartContext } from "../contexts/CartContext";

const TransactionButtons = () => {
    // Modalın açık/kapalı durumunu kontrol eden state
    const [openSearchModal, setOpenSearchModal] = useState(false);
   
    const handleOpenSearchModal = () => setOpenSearchModal(true);
    const handleCloseSearchModal = () => setOpenSearchModal(false);
    const {clearCart } = useCartContext();

    const [alertOpen, setAlertOpen] = useState(false); // Snackbar state
   
    const handleClick = () => {
      clearCart();
      setAlertOpen(true); // Show Snackbar
    }
    
   const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlertOpen(false);
    };
  return (
    <Container>
       <div style={{ display: "flex",flexDirection:"row" ,justifyContent: "space-between", margin: 20 }}>
         
         <div>
         <Button variant="contained" color="primary" onClick={handleOpenSearchModal}>Search from name</Button>
          </div>
         <div>
         <Button variant="contained" color="primary" >Button</Button>
       </div>
       <div>
       <Button variant="contained" color="primary" onClick={handleClick}>Cancel Order</Button>
          <Snackbar open={alertOpen} autoHideDuration={1000} onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Snackbar'ın konumu
        transitionDuration={{ enter: 500, exit: 500 }} // Snackbar'ın geçiş süresi
  >
            <Alert onClose={handleCloseAlert} severity="warning"  sx={{ width: '300px', fontSize: '1.2rem' }}>
              Cart is empty
            </Alert>
          </Snackbar>     </div>
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
