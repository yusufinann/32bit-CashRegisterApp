import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';



const CampaignListModal = ({ open, handleClose }) => {
  

  return (
    <Dialog open={open} onClose={() => { handleClose();}} aria-labelledby="campaign-list-dialog-title">
      <DialogTitle id="campaign-list-dialog-title">Kampanya Listesi</DialogTitle>
      <DialogContent>
        {/* <GlobalCardList array={filteredCampaignProducts} AddToCartFunction={handleAddToCart} /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() =>{}} color="primary">
          3 Al 2 Öde
        </Button>
        <Button onClick={() => {}} color="secondary">
          Yüzde 50 Indirim
        </Button>
        <Button onClick={() => {}} color="secondary">
          Yüzde 10 Indirim
        </Button>
        <Button onClick={() => {}} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignListModal;
