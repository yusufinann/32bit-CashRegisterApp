import React, { useState } from 'react';
import './CardList.css';
import { IconButton, Snackbar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useCartContext } from '../contexts/CartContext';

const GlobalCardList = ({ array, AddToCartFunction, handleFavorites, favoriteIds, calculateTotalPrice }) => {
  const { cart } = useCartContext(); // cart state'ini al
  const [cartAlertOpen, setCartAlertOpen] = useState(false); // Snackbar state for add to cart
  const [favoritesAlertOpen, setFavoritesAlertOpen] = useState(false); // Snackbar state for add to favorites
  const [favoriteItem, setFavoriteItem] = useState(null); // To keep track of the favorite item for alert message
  const { theme } = useTheme();
  const { t } = useTranslation();

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
      {array.map((arr) => {
        const cartItem = cart.find(item => item.product.id === arr.product_id);
        const isDiscounted = cartItem ? cartItem.campaignApplied !== null : false;
        const discountedPrice = cartItem ? cartItem.totalPrice : null;

        return (
          <div key={arr.product_id} className={`custom-card draw ${isDiscounted ? 'discounted' : ''}`} onClick={() => handleAddToCart(arr)}>
            {isDiscounted && (
              <div className="special-offer-ribbon">
                {cartItem.campaignApplied}
              </div>
            )}
            {arr.image_url ? (
              <img src={arr.image_url} alt={arr.product_name} className="product-image" />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
            <div className="card-content">
              <div className={`product-name ${theme}`}>{arr.product_name}</div>
              <div className={`product-price ${theme}`}>
                {isDiscounted ? (
                  <>
                    <span className="original-price">{t('Price')}: {arr.price} TL</span>
                    <span className="discounted-price">{t('Discounted Price')}: {discountedPrice.toFixed(2)} TL</span>
                    <span className="campaign-type">{cartItem.campaignApplied}</span>
                  </>
                ) : (
                  <span>{t('Price')}: {arr.price} TL</span>
                )}
              </div>
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
        );
      })}
      <Snackbar
        open={cartAlertOpen}
        autoHideDuration={1000}
        onClose={handleCloseCartAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseCartAlert} severity="success" sx={{ width: '300px', fontSize: '1.2rem' }}>
          {t('Added to Cart')}
        </Alert>
      </Snackbar>
      <Snackbar
        open={favoritesAlertOpen}
        autoHideDuration={1000}
        onClose={handleCloseFavoritesAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseFavoritesAlert} severity="success" sx={{ width: '300px', fontSize: '1.2rem' }}>
          {favoriteItem && favoriteIds && favoriteIds.includes(favoriteItem.product_id) ? t('Added to Favorites') : t('Removed from Favorites')}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default GlobalCardList;
