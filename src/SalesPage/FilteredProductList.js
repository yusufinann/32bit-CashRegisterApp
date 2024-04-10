import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

const FilteredProductList = () => {

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Filtered Products
      </Typography>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {/* {product.name} */}
                </Typography>
                <Typography variant="body1">
                  {/* Price: {product.price} TL */}
                </Typography>
                <Typography variant="body1">
                  {/* Barcode: {product.barcode} */}
                </Typography>
                </CardContent>
                </Card>
              </Grid>
          
          </Grid>
        </div>
      );
    };
    
    export default FilteredProductList;