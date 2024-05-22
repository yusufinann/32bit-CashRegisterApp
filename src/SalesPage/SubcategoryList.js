import React from 'react';
import '../GlobalComponents/CardList.css'
import { useGlobalContext } from '../contexts/GlobalContext';

const SubcategoryList = () => {
  const {state,handleShowProductsBySubcategory } = useGlobalContext();
  
 
  return (
    <div className="card-container">
    {state.subcategories.map((subcategory) => (
     <div
        key={subcategory.id}
        className="custom-card draw"
        onClick={() => handleShowProductsBySubcategory(subcategory.id)}
      >
        <div className="product-image-container">
          <img
            alt={subcategory.name}
            src={subcategory.image_url}
            className="product-image"
          />
        </div>
        <div className="card-content">
          <p>{subcategory.name}</p>
          </div>
      </div>
    ))}
  </div>
);
};
export default SubcategoryList;
