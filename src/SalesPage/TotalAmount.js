import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const TotalAmount = ({ totalAmount, subTotal }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '10px',
        borderBottomRightRadius:"20px",
        borderBottomLeftRadius:"20px",
        backgroundColor: "yellowgreen", // Arka plan rengi
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2" style={{ color: '#333', marginBottom: '5px', marginTop: '5px' }}>
        Shipping: 10 TL {/* Kargo ücreti, isteğe bağlı olarak burada gösterilebilir */}
      </Typography>
      <Divider sx={{ backgroundColor: '#333' }} />
      <Typography variant="h6" style={{ color: '#333', marginTop: '10px', fontSize: '1.2rem' }}>
        Total: {totalAmount} TL
      </Typography>
    </Box>
  );
};

export default TotalAmount;
