import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';
import { useTheme } from '../contexts/ThemeContext';

const PersistingCampaignItems = ({handleAddToCart,selectedCampaign,persistingCampaignItems  }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const getCampaignName = (campaignType) => {
    switch (campaignType) {
      case '3al2':
        return t('Buy 3 Pay 2');
      case 'etiketinYarisi':
        return t('Half of the Label');
      case 'yuzde10':
        return t('10 percent discount');
      default:
        return t('Unknown Campaign');
    }
  };

  if (!persistingCampaignItems || Object.keys(persistingCampaignItems).length === 0) {
    return <p>{t('No removed items with this campaign type')}</p>;
  }

  const filteredRemovedItems = selectedCampaign === 'all'
    ? Object.entries(persistingCampaignItems)
    : Object.entries(persistingCampaignItems).filter(([_, info]) => info.campaignApplied === selectedCampaign);

  if (filteredRemovedItems.length === 0) {
    return <p>{t('No removed items with this campaign type')}</p>;
  }

  const handleReAddToCart = (info) => {
    handleAddToCart({
      product_id: info.product_id,
      product_name: info.productName,
      image_url: info.image,
      barcode: info.barcode,
      campaignApplied: info.campaignApplied,
      totalPrice: info.totalPrice,
      quantity: info.quantity,
      price: info.price || (info.totalPrice / info.quantity),
      vat_rate: info.vat_rate
    }, info.campaignApplied);
  };

  return (
    <div className={`campaign-products-container ${theme}`}>
      {filteredRemovedItems.map(([productId, info]) => (
        <li 
          key={productId} 
          className="campaign-product-item" 
          onClick={() => handleReAddToCart(info)}
        >
          {info.image ? (
            <img
              src={info.image}
              alt={info.productName}
              className="campaign-product-image"
            />
          ) : (
            <div className="placeholder">{t('No Image')}</div>
          )}
          <div className="campaign-product-details">
            <h3>{info.productName}</h3>
            <p>{t('Barcode')}: {info.barcode}</p>
            <p>{t('Campaign')}: {getCampaignName(info.campaignApplied)}</p>
            <p>{t('Campaigned Price')}: {info.campaignApplied === '3al2'
              ? `${((info.price) * 2).toFixed(2)} TL (3 ${t('Piece')})`
              : `${(info.totalPrice / info.quantity).toFixed(2)} TL (1 ${t('Piece')})`
            }</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default PersistingCampaignItems;