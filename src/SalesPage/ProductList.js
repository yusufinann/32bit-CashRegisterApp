import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import './styles.css'; // Stil dosyası burada kullanılıyor.
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductList = () => {
  return (
    <div>
      <div className="card-container">
        
          <Card sx={{ width: 200 }} className="custom-card">
            <CardMedia
              component="img"
            //   alt={product.product_name}
              height="140"
            //   image={product.image_url}
            />
            <CardContent>
              <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
                {/* {product.product_name} */}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {/* {product.price} TL */}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
              >
                Add
              </Button>
            </CardContent>
          </Card>
      
      </div>
    </div>
  );
};

export default ProductList;
