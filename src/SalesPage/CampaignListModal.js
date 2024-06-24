import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';
import CampaignProducts from './CampaignProducts';
import "./styles.css";
const CampaignListModal = ({ openCampaignModalFn, closeCampaignModalFn,theme,t }) => {
  const { cart, handleAddToCart, handleCampaignSelect } = useCartContext();

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleCampaignClick = (campaignType) => {
    setSelectedCampaign(campaignType);
    handleCampaignSelect(campaignType);
  };

  return (
    <Dialog open={openCampaignModalFn} onClose={closeCampaignModalFn} >
      <DialogTitle id="campaign-list-dialog-title" className={`dialog-title ${theme}`}>{t('Campaign List')}</DialogTitle>
      <DialogContent className={`dialog-content ${theme}`}>
        <CampaignProducts selectedCampaign={selectedCampaign} cart={cart} handleAddToCart={handleAddToCart} theme={theme} t={t}/>
      </DialogContent>
      <DialogActions className={`dialog-actions ${theme}`}>
        <Button onClick={() => handleCampaignClick('3al2')} color="primary">
        {t('Buy 3 Pay 2')}
        </Button>
        <Button onClick={() => handleCampaignClick('etiketinYarisi')} color="secondary">
        {t('50 percent discount')}
        </Button>
        <Button onClick={() => handleCampaignClick('yuzde10')} color="secondary">
        {t('10 percent discount')}
        </Button>
        <Button onClick={closeCampaignModalFn} color="primary">
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignListModal;
