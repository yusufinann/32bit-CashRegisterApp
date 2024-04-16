
import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { useGlobalContext } from '../contexts/GlobalContext';

const TotalAmount = ({ totalAmount, subTotal }) => {
  const { cart } = useGlobalContext(); // Correctly call the function

  const calculateTotalPrice = (item) => {
    let totalCost = item.quantity * item.product.price;

    switch (item.product.campaign_id) {
      case 'C001':
        const numberOfFullDiscounts = Math.floor(item.quantity / 3);
        const numberOfPaidItems = item.quantity - numberOfFullDiscounts;
        totalCost = numberOfPaidItems * item.product.price;
        break;
      case 'C002':
        totalCost = item.quantity * item.product.price * 0.5;
        break;
      case 'C003':
        totalCost = item.quantity * item.product.price * 0.9;
        break;
      default:
        totalCost = item.quantity * item.product.price;
        break;
    }

    return totalCost;
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + calculateTotalPrice(item), 0); // Correct the reduce function
  };

  const Total = calculateCartTotal().toFixed(2); // Subtotal calculated directly here

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
  <span>{totalAmount} TL</span>
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
