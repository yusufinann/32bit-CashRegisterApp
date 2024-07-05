import React from "react"; // Assuming this is the path to your RemovedItemsCampaigns component
import "./styles.css";
import PersistingCampaignItems from "./PersistingCampaignItems";

const CampaignProducts = ({ selectedCampaign, cart, handleAddToCart,persistingCampaignItems, theme, t}) => {
  // Filter products based on the selected campaign
  const campaignProducts = selectedCampaign === 'all'
    ? cart.filter((item) => item.campaignApplied)
    : cart.filter((item) => item.campaignApplied === selectedCampaign);

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
            {item.product.image ? (
              <img
                src={item.product.image}
                alt={item.product.name}
                className="campaign-product-image"
              />
            ) : (
              <div className="placeholder">{t('No Image')}</div>
            )}
            <div className="campaign-product-details">
              <h3>{item.product.name}</h3>
              <p>{t('Barcode')}: {item.product.barcode}</p>
              <p>{t('Campaign')}: {item.campaignApplied}</p>
              <p>{t('Campaigned Price')}: {item.totalPrice.toFixed(2)} TL ({item.quantity} {t('Piece')})</p>
            </div>
          </div>
        ))
      ) : (
        <>
         <PersistingCampaignItems handleAddToCart ={handleAddToCart } selectedCampaign={selectedCampaign} persistingCampaignItems={persistingCampaignItems}/> 
        </>
      )}
    </div>
  );
};

export default CampaignProducts;
