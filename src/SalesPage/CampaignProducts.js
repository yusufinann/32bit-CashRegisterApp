import React from "react";
import "./styles.css";

const CampaignProducts = ({ selectedCampaign, cart, handleAddToCart,theme,t }) => {
  // Kampanyaya göre ürünleri filtreleyin
  const campaignProducts = selectedCampaign
    ? cart.filter((item) => item.campaignApplied === selectedCampaign)
    : cart.filter((item) => item.campaignApplied);

  return (
    <div className={`campaign-products-container ${theme}`}>
      <h2>{t('Campaigned Products')}</h2>
      {campaignProducts.length > 0 ? (
        campaignProducts.map((item) => (
          <div
            key={item.product.id}
            onClick={() =>
              handleAddToCart({
                ...item.product,
                product_id: item.product.id,
                product_name: item.product.name,
                image_url: item.product.image,
              }, item.campaignApplied)
            }
            className="campaign-product-item"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="campaign-product-image"
            />
            <div className="campaign-product-details">
              <h3>{item.product.name}</h3>
              <p>{t('Barcode')}: {item.product.barcode}</p>
              <p>{t('Campaign')}: {item.campaignApplied}</p>
              <p>{t('Price')}: {item.totalPrice.toFixed(2)} TL</p>
            </div>
          </div>
        ))
      ) : (
        <p>{t('There are no promotional products at the moment')}.</p>
      )}
    </div>
  );
};

export default CampaignProducts;
