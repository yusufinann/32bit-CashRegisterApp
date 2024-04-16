import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { IconButton, Typography, Button, Card, CardContent, CardActions, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const styles = {
  card: {
    marginBottom: 'auto',
    backgroundColor: "orange",
    width: "100%"
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '10px'
  },
  productDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between' // Ensure content is spread across the card
  },
  actions: {
    display: 'flex'
  }
};

const CartList = () => {
  const { removeFromCart, increaseQuantity, decreaseQuantity, cart,calculateTotalPrice } = useGlobalContext();


  const renderCartItem = (item) => (
    <Grid item xs={12} key={item.product.id}>
      <Card sx={styles.card}>
        <CardContent>
          <Box sx={styles.productDetails}>
            <img src={item.product.image} alt={item.product.name} style={styles.image} />
            <Box>
              <Typography gutterBottom variant="h6">
                {item.product.name}
              </Typography>
              <Typography variant="body1">Fiyat: {item.product.price} TL</Typography>
              <Typography variant="body1">Adet: {item.quantity} KDV : %{item.product.vat_rate}</Typography>

              <Typography variant="body1">Toplam : {calculateTotalPrice(item)} TL</Typography>
            </Box>
            <CardActions sx={styles.actions}>
              <IconButton color="secondary" onClick={() => removeFromCart(item.product)} aria-label="Remove item">
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => increaseQuantity(item.product)} aria-label="Add item">
                <AddIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => decreaseQuantity(item.product)} aria-label="Decrease item">
                <RemoveIcon />
              </IconButton>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderSummary = () => (
    <Box sx={{ padding: '20px', marginTop: 'auto' }}>
      <Grid container spacing={2}>
        {cart.map(renderCartItem)}
      </Grid>
    </Box>
  );

  const renderEmptyCart = () => (
    <Box sx={{ padding: '20px', margin: '20px', textAlign: 'center' }}>
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

  return <Box>{cart.length > 0 ? renderSummary() : renderEmptyCart()}</Box>;
};

export default CartList;