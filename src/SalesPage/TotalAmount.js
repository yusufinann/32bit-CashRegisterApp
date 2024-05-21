
import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { useCartContext } from '../contexts/CartContext';

const TotalAmount = ({subTotal }) => {
  const {Total } = useCartContext(); // Correctly call the function



  return (
    <Box
    sx={{
      padding: '5px',
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "10px",
      backgroundColor: "#0E3F57",
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="h6" style={{ color: 'white', marginTop: 'auto', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
  <span>Ara Toplam</span>
  <span>{subTotal} TL</span> 
</Typography>

    <Divider sx={{ backgroundColor: 'white' }} />
    <Typography variant="h6" style={{ color: 'white', marginTop: 'auto', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
  <span>Toplam</span>
  <span>{Total} TL</span>
</Typography>
   
  </Box>
  );
};

export default TotalAmount;
