import React, { useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import BarcodeInput from './BarcodeInput';
import ButtonContainer from './ButtonContainer';
import ErrorPage from '../../GlobalComponents/ErrorPage';
import { useCartContext } from '../../contexts/CartContext';
import ProductSections from './ProductSections';

const ProductCatalog = ({
  theme, t, state, setState,
  handleShowCategories, handleShowProducts,
  handleSubCategoriesClick, handleShowProductsBySubcategory,
  handleShowSubcategoryByCategoryId, loading, error, handleBarcodeChange,
}) => {
  const { handleAddToCart } = useCartContext();

  useEffect(() => {
    if (state.showProducts && !state.products.length) {
      handleShowProducts();
    }
  }, [handleShowProducts, state.showProducts, state.products.length]);

  const handleBarcodeInputChange = useCallback((value) => {
    handleBarcodeChange({ target: { value } });
    const matchedProduct = state.products.find(product => product.barcode === value);
    if (matchedProduct) {
      handleAddToCart(matchedProduct);
    }
  }, [handleBarcodeChange, state.products, handleAddToCart]);

  const toggleProducts = useCallback(() => {
    setState(prevState => ({ ...prevState, showProducts: !prevState.showProducts }));
  }, [setState]);

  const toggleCategories = useCallback(() => {
    setState(prevState => ({ ...prevState, showCategories: !prevState.showCategories }));
  }, [setState]);

  const toggleSubcategories = useCallback(() => {
    setState(prevState => ({ ...prevState, showSubcategories: !prevState.showSubcategories }));
  }, [setState]);

  return (
    <>
      <BarcodeInput theme={theme} t={t} onChange={handleBarcodeInputChange} />
      <ButtonContainer
        t={t}
        handleShowCategories={handleShowCategories}
        handleSubCategoriesClick={handleSubCategoriesClick}
        handleShowProducts={handleShowProducts}
      />
      {error ? (
        <ErrorPage message={t('Data could not be retrieved, please check the service')} />
      ) : (
        loading ? (
          <CircularProgress />
        ) : (
          <ProductSections
            state={state}
            handleAddToCart={handleAddToCart}
            toggleCategories={toggleCategories}
            handleShowSubcategoryByCategoryId={handleShowSubcategoryByCategoryId}
            toggleProducts={toggleProducts}
            handleShowProductsBySubcategory={handleShowProductsBySubcategory}
            toggleSubcategories={toggleSubcategories}
            theme={theme}
          />
        )
      )}
    </>
  );
};

export default ProductCatalog;
