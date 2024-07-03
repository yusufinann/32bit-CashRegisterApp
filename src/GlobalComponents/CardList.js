import React from 'react';
import '../GlobalComponents/CardList';
import { useTranslation } from 'react-i18next';

const CardList = ({ items, handleClick, theme }) => {
  const{t}=useTranslation();
  return (
    <div className={`card-container ${theme}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`custom-card draw ${theme}`}
          onClick={() => handleClick(item)}
        >
          <div className="product-image-container">
            {item.image_url ? (
              <img src={item.image_url} alt={item.name} className="product-image" />
            ) : (
              <div className="placeholder-image">{t('No Image')}</div>
            )}
          </div>
          <div className={`card-content ${theme}`}>
            <p className={`product-name ${theme}`}>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
