import React from 'react';
import FilteredProductList from '../FilteredProductList';
import CategoryList from '../CategoryList';
import ProductList from '../ProductList';
import SubcategoryList from '../SubcategoryList';

const ProductSections = React.memo(({
  state, handleAddToCart,
  toggleCategories, handleShowSubcategoryByCategoryId,
  toggleProducts, handleShowProductsBySubcategory,
  toggleSubcategories, theme,
}) => {
  return (
    <>
      {state.showFilteredProducts && (
        <FilteredProductList state={state} handleAddToCart={handleAddToCart} />
      )}
      {state.showCategories && (
        <CategoryList
          isOpen={state.showCategories}
          toggle={toggleCategories}
          handleShowSubcategoryByCategoryId={handleShowSubcategoryByCategoryId}
          state={state}
          theme={theme}
        />
      )}
      {state.showProducts && (
        <ProductList
          isOpen={state.showProducts}
          toggle={toggleProducts}
          handleAddToCart={handleAddToCart}
          state={state}
        />
      )}
      {state.showSubcategories && (
        <SubcategoryList
          isOpen={state.showSubcategories}
          toggle={toggleSubcategories}
          handleShowProductsBySubcategory={handleShowProductsBySubcategory}
          state={state}
          theme={theme}
        />
      )}
    </>
  );
});

export default ProductSections;
