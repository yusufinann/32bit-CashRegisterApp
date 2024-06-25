import React from 'react';
import { Grid, Input, Button } from '@mui/material';

import BackspaceIcon from '@mui/icons-material/Backspace';

const buttonStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  fontWeight: "bold",
  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s',
  fontSize: '1.5rem',
  ':hover': {
    backgroundColor: '#FFD700',
  },
};

const DisplayAndControls = ({ theme, input, t, handleSaveAndNavigate, handleDeleteOne }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={9} style={{ height: '70px' }}>
        <Input
          fullWidth
          type="text"
          value={input}
          placeholder="0"
          readOnly
          style={{ fontSize: '2rem', textAlign: "right", color: theme === 'dark' ? 'white' : 'black' }}
        />
      </Grid>
      <Grid item xs={3} style={{ height: '70px' }}>
      <Button color="primary" onClick={handleDeleteOne} sx={buttonStyle}>
          <BackspaceIcon />
        </Button>
      </Grid>
      <Grid item xs={6} style={{ height: '150px' }}>
        <Button variant="contained" onClick={() => handleSaveAndNavigate('Nakit')} color="success" sx={buttonStyle}>
          {t('Cash')}
        </Button>
      </Grid>
      <Grid item xs={6} style={{ height: '150px' }}>
        <Button variant="contained" onClick={() => handleSaveAndNavigate('Kart')} color="error" sx={buttonStyle}>
          {t('Credit Card')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default DisplayAndControls;
