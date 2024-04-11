import React from 'react';
    import PropTypes from 'prop-types';
    import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material'; // Import Material-UI components
    import { useGlobalContext } from '../contexts/GlobalContext';
    import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
    import './styles.css';
    
    const FilteredProductList = () => {
        const { state, addToCart } = useGlobalContext();
      
        const handleAddToCart = (product) => {
          addToCart(product);
        };
      
        const handleCardClick = (product) => {
          addToCart(product);
        };
    
      return (
        <div>
          <div className="card-container">
            {state.filteredProducts.map((product, index) => (
              <Card key={product.product_id} sx={{ width: 200 }} className="custom-card" onClick={() => handleCardClick(product)}>
                <CardMedia
                  component="img"
                  alt={product.product_name}
                  height="140"
                  image={product.image_url}
                />
                <CardContent>
                  <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body1">
                    Price: {product.price} TL
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={(e) => {
                      e.stopPropagation(); // Stop the card's onClick event
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
    
    FilteredProductList.propTypes = {
      filteredProducts: PropTypes.array.isRequired,
    };
    
    export default FilteredProductList;
    