import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import '../GlobalComponents/CardList.css'
const CategoryList = () => {
  const { handleShowSubcategoryByCategoryId, state } = useGlobalContext();

  return (
    <div className="card-container">
      {state.categories.map((category) => (
        <div
          key={category.id} // Assuming 'id' is a unique identifier for category data
          className="custom-card draw" // Apply the custom card style
          onClick={() => handleShowSubcategoryByCategoryId(category.category_id)} // Handle click event to show subcategory
        >
          <div className="product-image-container">
            <img
              src={category.image_url}
              alt={category.category_name}
              className="product-image"
            />
          </div>
          <div className="card-content">
            <p className="product-name">{category.category_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CategoryList;
