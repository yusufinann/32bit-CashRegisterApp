import React from "react";
import { useCartContext } from "../../contexts/CartContext";
import "../styles.css";

const CampaignChoices = ({ productId, onClose, t }) => {
  const { setCart, cart, calculateTotalPrice, checkedProducts } = useCartContext();

  const product = cart.find(item => item.product.id === productId);
  const activeCampaign = product?.campaignApplied || "";

  const selectCampaign = (productId, campaign) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { 
              ...item, 
              campaignApplied: item.campaignApplied === campaign ? null : campaign, 
              totalPrice: calculateTotalPrice({
                ...item, 
                campaignApplied: item.campaignApplied === campaign ? null : campaign 
              }, checkedProducts) // Pass checkedProducts here
            }
          : item
      )
    );
    onClose();
  };

  return (
    <div className="campaign-container">
      <button
        className={`campaign-choice ${activeCampaign === "3al2" ? "active" : ""}`}
        onClick={() => selectCampaign(productId, "3al2")}
      >
        {t('Buy 3 Pay 2')}
      </button>
      <button
        className={`campaign-choice ${activeCampaign === "etiketinYarisi" ? "active" : ""}`}
        onClick={() => selectCampaign(productId, "etiketinYarisi")}
      >
        {t('Half of the Label')}
      </button>
      <button
        className={`campaign-choice ${activeCampaign === "yuzde10" ? "active" : ""}`}
        onClick={() => selectCampaign(productId, "yuzde10")}
      >
        {t('10 percent discount')}
      </button>
      {activeCampaign && (
    <div className="active-campaign">
      {t('Active Campaign')}: {activeCampaign === '3al2' ? t('Buy 3 Pay 2') :
                                   activeCampaign === 'etiketinYarisi' ? t('Half of the Label') :
                                   activeCampaign === 'yuzde10' ? t('10% discount') : ''}
    </div>
  )}
    </div>
  );
};

export default CampaignChoices;
