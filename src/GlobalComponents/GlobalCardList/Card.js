import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTranslation } from "react-i18next";
import "./CardList.css";
const Card = ({ 
  item, 
  cartItem, 
  isDiscounted, 
  campaignApplied,
  discountedPrice, 
  quantity, 
  handleFavoriteClick, 
  handleAddToCart, 
  isFavorite, 
  theme, 
  handleFavorites,
  favoriteIds 
}) => {
  const { t } = useTranslation();

  const renderPriceInfo = () => {
    if (isDiscounted) {
      if (campaignApplied === "3al2") {
        const priceFor3 = (item.price * 2).toFixed(2);
        return (
          <div className="price-container">
            <span className="original-price">
              <del>{item.price.toFixed(2)} TL</del>
            </span>
            <span className="discounted-price">
              <strong>{priceFor3} TL</strong> {t("for 3")}
            </span>
          </div>
        );
      } else {
        return (
          <div className="price-container">
            <span className="original-price">
              <del>{item.price.toFixed(2)} TL</del>
            </span>
            <span className="discounted-price">
              <strong>{discountedPrice.toFixed(2)} TL</strong>
            </span>
          </div>
        );
      }
    } else {
      return <span>{item.price.toFixed(2)} TL</span>;
    }
  };

  return (
    <div
      key={item.product_id}
      className={`custom-card draw ${isDiscounted ? "discounted" : ""} ${theme}`}
      onClick={() => handleAddToCart(item)}
    >
      {isDiscounted && (
        <div className="special-offer-ribbon">
          {campaignApplied === "etiketinYarisi" && `%50 ${t("Sale")}`}
          {campaignApplied === "3al2" && `${t("Buy 3 Pay 2")}`}
          {campaignApplied === "yuzde10" && `%10 ${t("Sale")}`}
        </div>
      )}

      {item.image_url ? (
        <img src={item.image_url} alt={item.product_name} className="product-image" />
      ) : (
        <div className="placeholder-image">{t("No Image")}</div>
      )}
      
      <div className="card-content">
        <div className={`product-name ${theme}`}>{item.product_name}</div>
        <div className={`product-price ${theme}`}>
          {renderPriceInfo()}
        </div>
        {(handleFavorites || favoriteIds) && (
        <IconButton
          onClick={(event) => handleFavoriteClick(event, item)}
          sx={{
            zIndex: 2,
            color: isFavorite ? "red" : "gray",
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        )}
      </div>
    </div>
  );
};
export default Card;