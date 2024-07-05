import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';
import CampaignProducts from './CampaignProducts';// Adjust the import path as per your project structure
import "./styles.css";

const CampaignListModal = ({ openCampaignModalFn, closeCampaignModalFn, theme, t }) => {
  const { cart, handleAddToCart, handleCampaignSelect, selectedCampaign, setSelectedCampaign,persistingCampaignItems } = useCartContext();

  useEffect(() => {
    if (openCampaignModalFn) {
      // Set default campaign when the modal opens
      setSelectedCampaign('all');
      handleCampaignSelect('all');
    }
  }, [openCampaignModalFn, setSelectedCampaign, handleCampaignSelect]);

  const handleCampaignClick = (campaignType) => {
    setSelectedCampaign(campaignType);
    handleCampaignSelect(campaignType);
  };

  return (
    <Dialog open={openCampaignModalFn} onClose={closeCampaignModalFn} >
      <DialogTitle id="campaign-list-dialog-title" className={`dialog-title ${theme}`}>{t('Campaign List')}</DialogTitle>
      <DialogContent className={`dialog-content ${theme}`}>
        <CampaignProducts selectedCampaign={selectedCampaign} cart={cart} handleAddToCart={handleAddToCart} openCampaignModalFn={openCampaignModalFn} handleCampaignSelect ={handleCampaignSelect} persistingCampaignItems={persistingCampaignItems} theme={theme} t={t} />
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
