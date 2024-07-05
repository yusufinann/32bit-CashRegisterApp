import React, { useState, useCallback, useMemo } from "react";
import "./CardList.css";
import Card from "./Card";
import SnackbarAlert from "./SnackbarAlert";
import { useCartContext } from "../../contexts/CartContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";

const GlobalCardList = ({ array, AddToCartFunction, handleFavorites, favoriteIds }) => {
  const { cart,persistingCampaignItems } = useCartContext();
  const [cartAlertOpen, setCartAlertOpen] = useState(false);
  const [favoritesAlertOpen, setFavoritesAlertOpen] = useState(false);
  const [favoriteItem, setFavoriteItem] = useState(null);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleFavoriteClick = useCallback((event, item) => {
    event.stopPropagation();
    handleFavorites(event, item);
    setFavoriteItem(item);
    setFavoritesAlertOpen(true);
  }, [handleFavorites]);

  const handleAddToCart = useCallback((item) => {
    AddToCartFunction(item);
    setCartAlertOpen(true);
  }, [AddToCartFunction]);

  const handleCloseCartAlert = useCallback((reason) => {
    if (reason === "clickaway") return;
    setCartAlertOpen(false);
  }, []);

  const handleCloseFavoritesAlert = useCallback((reason) => {
    if (reason === "clickaway") return;
    setFavoritesAlertOpen(false);
  }, []);

  const cardItems = useMemo(() => (
    array.map((item) => {
      const cartItem = cart.find((cartItem) => cartItem.product.id === item.product_id);
      const persistingItem = persistingCampaignItems[item.product_id];
      const isDiscounted = (cartItem && cartItem.campaignApplied !== null) || (persistingItem && persistingItem.campaignApplied !== null);
      const campaignApplied = cartItem?.campaignApplied || persistingItem?.campaignApplied;
      const quantity = cartItem ? cartItem.quantity : 0;
      const discountedPrice = cartItem ? cartItem.totalPrice / cartItem.quantity : (persistingItem ? persistingItem.totalPrice / persistingItem.quantity : null);
      const isFavorite = favoriteIds && favoriteIds.includes(item.product_id);
  
      return (
        <Card
          key={item.product_id}
          item={item}
          cartItem={cartItem}
          isDiscounted={isDiscounted}
          campaignApplied={campaignApplied}
          discountedPrice={discountedPrice}
          quantity={quantity}
          handleFavoriteClick={handleFavoriteClick}
          handleAddToCart={handleAddToCart}
          isFavorite={isFavorite}
          theme={theme}
          handleFavorites={handleFavorites}
          favoriteIds={favoriteIds}
        />
      );
    })
  ), [array, cart, persistingCampaignItems, favoriteIds, handleAddToCart, handleFavoriteClick, handleFavorites, theme]);
  return (
    <div className={`card-container ${theme}`}>
      {cardItems}
      <SnackbarAlert
        open={cartAlertOpen}
        handleClose={handleCloseCartAlert}
        message={t("Added to Cart")}
      />
      <SnackbarAlert
        open={favoritesAlertOpen}
        handleClose={handleCloseFavoritesAlert}
        message={
          favoriteItem && favoriteIds && favoriteIds.includes(favoriteItem.product_id)
            ? t("Added to Favorites")
            : t("Removed from Favorites")
        }
      />
    </div>
  );
};

export default React.memo(GlobalCardList);