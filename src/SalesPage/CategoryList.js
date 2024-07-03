import React from 'react';
import CardList from '../GlobalComponents/CardList';

const CategoryList = ({ handleShowSubcategoryByCategoryId, state, theme }) => {
  const items = state.categories.map(category => ({
    id: category.id,
    name: category.category_name,
    image_url: category.image_url,
    category_id: category.category_id, // include the category_id for the handleClick function
  }));

  return (
    <CardList 
      items={items}
      handleClick={(item) => handleShowSubcategoryByCategoryId(item.category_id)}
      theme={theme}
    />
  );
};

export default CategoryList;
