import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import GlobalCardList from '../GlobalComponents/GlobalCardList';
import { useGlobalContext } from '../contexts/GlobalContext';



const CampaignListModal = () => {
    const { openCampaignModal, closeCampaignModalFn, handleAddToCart, handleCampaignFilter, filteredCampaignProducts } = useGlobalContext();


  return (
    <Dialog open={openCampaignModal} onClose={closeCampaignModalFn} aria-labelledby="campaign-list-dialog-title">
    <DialogTitle id="campaign-list-dialog-title">Kampanya Listesi</DialogTitle>
    <DialogContent>
      <GlobalCardList array={filteredCampaignProducts} AddToCartFunction={handleAddToCart} />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleCampaignFilter('C001')} color="primary">3 Al 2 Öde</Button>
      <Button onClick={() => handleCampaignFilter('C002')} color="secondary">Yüzde 50 Indirim</Button>
      <Button onClick={() => handleCampaignFilter('C003')} color="secondary">Yüzde 10 Indirim</Button>
      <Button onClick={closeCampaignModalFn} color="primary">Close</Button>
    </DialogActions>
  </Dialog>
  );
};

export default CampaignListModal;
