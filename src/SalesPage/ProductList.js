import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import './styles.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductList = ({ products, isOpen, toggle }) => {
  const { addToCart } = useGlobalContext();

  return (
    <div>
      <div className="card-container">
        {products.map((product) => (
          <Card key={product.product_id} sx={{ width: 200 }} className="custom-card" onClick={() => addToCart(product)}>
            <CardMedia
              component="img"
              alt={product.product_name}
              height="140"
              image={product.image_url}
            />
            <CardContent>
              <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
                {product.product_name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {product.price} TL
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
        ))}
      </div>
    </div>
  );
};

export default ProductList;