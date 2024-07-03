import React from 'react';
import CardList from '../GlobalComponents/CardList';

const SubcategoryList = ({ state, handleShowProductsBySubcategory, theme }) => {
  const items = state.subcategories.map(subcategory => ({
    id: subcategory.id,
    name: subcategory.name,
    image_url: subcategory.image_url,
  }));

  return (
    <CardList 
      items={items}
      handleClick={(item) => handleShowProductsBySubcategory(item.id)}
      theme={theme}
    />
  );
};

export default SubcategoryList;
