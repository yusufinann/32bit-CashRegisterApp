import React, { useState } from 'react';
import './CardList.css';
import { IconButton, Snackbar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useCartContext } from '../contexts/CartContext';

const GlobalCardList = ({ array, AddToCartFunction, handleFavorites, favoriteIds }) => {
  const { cart } = useCartContext();
  const [cartAlertOpen, setCartAlertOpen] = useState(false);
  const [favoritesAlertOpen, setFavoritesAlertOpen] = useState(false);
  const [favoriteItem, setFavoriteItem] = useState(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleFavoriteClick = (event, item) => {
    event.stopPropagation();
    handleFavorites(event, item); // Favori durumunu güncelle
    setFavoriteItem(item); // Favori için alert mesajı için ürünü ayarla
    setFavoritesAlertOpen(true); // Favori eklenme/kaldırılma Snackbar'ını göster
  };

  const handleAddToCart = (item) => {
    AddToCartFunction(item);
    setCartAlertOpen(true); // Sepete ekleme Snackbar'ını göster
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
        const isDiscounted = cartItem && cartItem.campaignApplied !== null;
        const discountedPrice = cartItem ? cartItem.totalPrice.toFixed(2) : null;

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
                  <div className="price-container">
                    <span className="original-price">{t('Price')}: <del>{arr.price.toFixed(2)} TL</del></span>
                    <span className="discounted-price"><strong>{discountedPrice} TL</strong></span>
                  </div>
                ) : (
                  <span>{t('Price')}: {arr.price.toFixed(2)} TL</span>
                )}
              </div>
              {(handleFavorites || favoriteIds) && (
                <IconButton
                  onClick={(event) => handleFavoriteClick(event, arr)}
                  sx={{ zIndex: 2, color: favoriteIds && favoriteIds.includes(arr.product_id) ? 'red' : 'gray' }}
                >
                  {favoriteIds && favoriteIds.includes(arr.product_id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              )}
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
