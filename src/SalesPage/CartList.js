import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { IconButton, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartList = () => {
  const { removeFromCart, increaseQuantity, decreaseQuantity, cart, totalAmount } = useGlobalContext();

  const renderCartItem = (item) => {
    return (
    
        <Card sx={{ marginBottom: '5px', height: 'auto', backgroundColor: "orange", width: "100%" }} >
          <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '10%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto' }}>
              <img src={item.product.image} alt={item.product.name} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
              <div>
                <Typography gutterBottom variant="h6">
                  {item.product.name}
                </Typography>
                <Typography variant="body1">
                  Price: {item.product.price} TL
                </Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1">
                  Total: {item.product.price * item.quantity} TL
                </Typography>
              </div>
              <div style={{ marginLeft: 'auto' }}>
              <CardActions >
              <IconButton color="secondary" aria-label="Remove" onClick={() => removeFromCart(item.product)}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Add" onClick={() => increaseQuantity(item.product)}>
                <AddIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Remove" onClick={() => decreaseQuantity(item.product)}>
                <RemoveIcon />
              </IconButton>
            </CardActions>
              </div>
            </div>           
          </CardContent>
        </Card>
     
    );
  };

  const renderSummary = () => {
    return (
      <div style={{ padding: '20px', marginTop: 'auto' }}>
        <Grid container spacing={2}>
          {cart.map(renderCartItem)}
        </Grid>
       {/* <Button
          variant="contained"
          color="secondary"
          startIcon={<PaymentIcon />}
          onClick={() => alert('Redirect to payment page')}
          style={{ marginTop: '20px' }}
        >
          Proceed to Payment
    </Button>*/}
      </div>
    );
  };

  const renderEmptyCart = () => {
    return (
      <div style={{ padding: '20px', margin: '20px', textAlign: 'center' }}>
        <Typography variant="h5">Your Cart is Empty</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={() => alert('Redirect to shopping page')}
          style={{ marginTop: '20px' }}
        >
          Go Shopping
        </Button>
      </div>
    );
  };

  return <div>{cart.length > 0 ? renderSummary() : renderEmptyCart()}</div>;
};

export default CartList;
