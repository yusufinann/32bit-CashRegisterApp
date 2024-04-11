import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import './styles.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductList = ({ products }) => {
  const {handleAddToCart,handleCardClick } = useGlobalContext();

  return (
    <div>
      <div className="card-container">
        {products.map((product) => (
          <Card key={product.product_id} sx={{ width: 150 }} className="custom-card" onClick={() => handleCardClick(product)}>
            <CardMedia
              component="img"
              alt={product.product_name}
              height="150"
              image={product.image_url}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.product_name}
              </Typography>
              <Typography variant="body2">
                {product.price} TL
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // Kartın onClick olayını durdur
                  handleAddToCart(product);
                }}
              >
                Sepete Ekle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;