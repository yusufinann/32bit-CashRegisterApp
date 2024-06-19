import React, { useState } from 'react';
import './CardList.css'
import { IconButton, Snackbar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '../contexts/ThemeContext';

const GlobalCardList = ({ array, AddToCartFunction, handleFavorites, favoriteIds }) => {
  const [cartAlertOpen, setCartAlertOpen] = useState(false); // Snackbar state for add to cart
  const [favoritesAlertOpen, setFavoritesAlertOpen] = useState(false); // Snackbar state for add to favorites
  const [favoriteItem, setFavoriteItem] = useState(null); // To keep track of the favorite item for alert message
  const { theme } = useTheme();
  const handleFavoriteClick = (event, item) => {
    event.stopPropagation();
    if (favoriteIds && favoriteIds.includes(item.product_id)) {
      handleFavorites(event, item); // Remove from favorites
      setFavoriteItem(item); // Set favorite item for alert message
      setFavoritesAlertOpen(true); // Show favorites removed Snackbar
    } else {
      handleFavorites(event, item); // Add to favorites
      setFavoriteItem(item); // Set favorite item for alert message
      setFavoritesAlertOpen(true); // Show favorites added Snackbar
    }
  };

  const handleAddToCart = (item) => {
    AddToCartFunction(item);
    setCartAlertOpen(true); // Show add to cart Snackbar
  };

  const handleCloseCartAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCartAlertOpen(false);
  };

  const handleCloseFavoritesAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFavoritesAlertOpen(false);
  };

  return (
    <div className={`card-container ${theme}`}>
      {array.map((arr) => (
        <div key={arr.product_id} className="custom-card draw" onClick={() => handleAddToCart(arr)}>
          
          {arr.image_url ? (
            <img src={arr.image_url} alt={arr.product_name} className="product-image" />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
          <div className="card-content">
            <div  className={`product-name ${theme}`}>{arr.product_name}</div>
            <div className={`product-price ${theme}`}>Price: {arr.price} TL</div>
            
            {handleFavorites || favoriteIds ? (
              <IconButton
                onClick={(event) => handleFavoriteClick(event, arr)}
                sx={{ zIndex: 2, color: favoriteIds && favoriteIds.includes(arr.product_id) ? 'red' : 'gray' }}
               
              >
                {favoriteIds && favoriteIds.includes(arr.product_id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            ) : null}
          </div>
        </div>
      ))}
      <Snackbar 
        open={cartAlertOpen} 
        autoHideDuration={1000} 
        onClose={handleCloseCartAlert} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      >
        <Alert onClose={handleCloseCartAlert} severity="success" sx={{ width: '300px', fontSize: '1.2rem' }}>
          Added to Cart
        </Alert>
      </Snackbar>
      <Snackbar 
        open={favoritesAlertOpen} 
        autoHideDuration={1000} 
        onClose={handleCloseFavoritesAlert} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      >
        <Alert onClose={handleCloseFavoritesAlert} severity="success" sx={{ width: '300px', fontSize: '1.2rem' }}>
          {favoriteItem && favoriteIds && favoriteIds.includes(favoriteItem.product_id) ? 'Added to Favorites' : 'Removed from Favorites'}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default GlobalCardList;