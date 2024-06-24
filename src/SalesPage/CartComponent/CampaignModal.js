import React from 'react'
import { Box, Typography, Modal, Fade } from "@mui/material";
import CampaignChoices from './CampaignChoices';

const CampaignModal = ({campaignModalOpen,handleCloseCampaignModal,productId,t}) => {
  return (
    <Modal
    open={campaignModalOpen}
    onClose={handleCloseCampaignModal}
    aria-labelledby="campaign-modal-title"
    aria-describedby="campaign-modal-description"
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Fade in={campaignModalOpen}>
      <Box
        sx={{
          backgroundColor: '#fff',
          border: '2px solid #9c27b0',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          outline: 'none',
          minWidth: '300px',
          maxWidth: '80%',
        }}
      >
        <Typography variant="h6" id="campaign-modal-title" sx={{ marginBottom: '16px', color: '#9c27b0' }}>
        {t('Campaign Options')}
        </Typography>
        <CampaignChoices productId={productId} onClose={handleCloseCampaignModal} t={t}/>
      </Box>
    </Fade>
  </Modal>
  )
}

export default CampaignModal
