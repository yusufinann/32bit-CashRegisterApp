import React from 'react';
import { Button, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const buttonStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s',
  fontSize: '1.5rem',
  ':hover': {
    backgroundColor: '#FFD700',
  },
};

const FunctionButtons = ({ handleClear, handleDeleteOne, openCampaignModal, t }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} style={{ height: '70px',marginTop:"10px" }}>
        <Button variant="contained" color="secondary" onClick={handleClear} sx={buttonStyle}>
          <ClearIcon />
        </Button>
      </Grid>
      <Grid item xs={12} style={{ height: '70px' }}>
        <Button variant="contained" onClick={openCampaignModal} color="success" sx={buttonStyle}>
          {t('Campaign List')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FunctionButtons;
