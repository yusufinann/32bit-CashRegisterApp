import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { IconButton, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartList = () => {
 const renderCartItem = () => {
    return (
    
        <Card sx={{ marginBottom: '5px', height: 'auto', backgroundColor: "orange", width: "100%" }} >
          <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '10%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto' }}>
              <img  style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
              <div>
                <Typography gutterBottom variant="h6">
                  product name
                </Typography>
                <Typography variant="body1">
                  product.price TL
                </Typography>
                <Typography variant="body1">
                  Quantity
                </Typography>
                <Typography variant="body1">
                  Total
                </Typography>
              </div>
              <div style={{ marginLeft: 'auto' }}>
              <CardActions >
              <IconButton color="secondary" aria-label="Remove">
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Add">
                <AddIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Remove">
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

};

export default CartList;
