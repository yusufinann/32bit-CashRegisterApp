import React from 'react';
import '../GlobalComponents/CardList.css'

const SubcategoryList = ( {state,handleShowProductsBySubcategory }) => {  
 
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
