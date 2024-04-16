import React from 'react';
import { Box, Typography, IconButton, Paper, Button, useTheme, useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGlobalContext } from '../contexts/GlobalContext';

const CartList = () => {
  const { removeFromCart, increaseQuantity, decreaseQuantity, cart,calculateTotalPrice } = useGlobalContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderCartItem = (item) => {
    const normalTotal = item.quantity * item.product.price;
    const discountedTotal = calculateTotalPrice(item);
    const isDiscounted = normalTotal.toFixed(2) !== discountedTotal.toFixed(2);
  
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        borderBottom: '4px solid #eee',
        bgcolor: isDiscounted ? 'rgba(255, 235, 59, 0.3)' : '#FFD467', // Kampanyalıysa arkaplan rengi
        borderLeft: isDiscounted ? '5px solid #f50057' : 'none', // Kampanyalıysa sol kenarlık
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Typography variant={isSmallScreen ? "caption" : "body2"} color="text.secondary" sx={{ alignSelf: 'flex-start' }}>
            {item.product.barcode}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'flex-end' }}>
            KDV%{item.product.vat_rate}
          </Typography>
        </Box>
        
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Box sx={{ flexBasis: '40%', flexGrow: 1 }}>
            <Typography variant={isSmallScreen ? "body2" : "subtitle1"} sx={{ fontWeight: 'bold' }}>
              {item.product.name}
              {isDiscounted && (
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}>
                  <Typography component="span" sx={{ color: '#f50057', fontWeight: 'bold' }}>
                    Kampanya!
                  </Typography>
                </Box>
              )}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexBasis: '30%',
            justifyContent: 'flex-end'
          }}>
            <IconButton size="small" color="primary" onClick={() => decreaseQuantity(item.product)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <Typography variant="body1" sx={{
              minWidth: '50px',
              textAlign: 'center',
              fontSize: isSmallScreen ? '0.8rem' : '1rem'
            }}>
              {item.quantity} adet
            </Typography>
            <IconButton size="small" color="primary" onClick={() => increaseQuantity(item.product)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '0.8rem' : '1rem', flexBasis: '15%' }}>
            {discountedTotal.toFixed(2)} TL
          </Typography>
          <IconButton color="error" onClick={() => removeFromCart(item.product)} sx={{ flexBasis: '5%' }}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };
  const renderSummary = () => (
    <Paper elevation={3} sx={{
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      marginY: 1,
      borderRadius: '10px',
    }}>
      {cart.map((item) => renderCartItem(item))}
    </Paper>
  );

  const renderEmptyCart = () => (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h5">Your Cart is Empty</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
        onClick={() => alert('Redirect to shopping page')}
        sx={{ marginTop: '20px' }}
      >
        Go Shopping
      </Button>
    </Box>
  );

  return <Box sx={{ padding: 3 }}>{cart.length > 0 ? renderSummary() : renderEmptyCart()}</Box>;
};

export default CartList;
