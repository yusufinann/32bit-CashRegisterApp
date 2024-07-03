import React, { useCallback, useEffect } from 'react';
import { Button, TextField, IconButton, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './styles.css';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import FilteredProductList from './FilteredProductList';
import SubcategoryList from './SubcategoryList';
import { useKeyboardContext } from '../contexts/KeyboardContext';
import ErrorPage from '../GlobalComponents/ErrorPage';
import { useCartContext } from '../contexts/CartContext';

const ProductCatalog = ({ theme, t, state,
  setState,
  handleShowCategories,
  handleShowProducts,
  handleSubCategoriesClick,
  handleShowProductsBySubcategory,
  handleShowSubcategoryByCategoryId,
  loading, 
  error,handleBarcodeChange, 
}) => {
  
  const { handleClear } = useKeyboardContext();
  const { handleAddToCart } = useCartContext();
  useEffect(() => {
    if (state.showProducts && !state.products.length) {
      handleShowProducts(); // Load products when the component mounts if products are not already loaded
    }
  }, [handleShowProducts, state.showProducts, state.products.length]);

  const handleBarcodeInputChange = (event) => {
    const value = event.target.value;
    handleBarcodeChange({ target: { value } });

    // Eşleşen ürünü sepete ekleme
    const matchedProduct = state.products.find(product => product.barcode === value);
    if (matchedProduct) {
      handleAddToCart(matchedProduct);
    }
  };

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
      <TextField
        id="barcode"
        placeholder={t('Enter Barcode...')}
        onChange={handleBarcodeInputChange}
        fullWidth
        variant="outlined"
        sx={{
          input: { cursor: "pointer", color: theme === 'dark' ? 'white' : 'black'},
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme === 'dark' ? 'red' : 'default',
            },
            '&:hover fieldset': {
              borderColor: theme === 'dark' ? 'red' : 'default',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme === 'dark' ? 'red' : 'default',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClear} style={{ color: "#dc143c" }}>
              <ClearIcon />
            </IconButton>
          ),
        }}
        InputLabelProps={{
          style: { color: "#dc143c" },
        }}
      />
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={handleShowCategories}>
          {t('Categories')}
        </Button>
        <Button variant="contained" color="success" onClick={handleSubCategoriesClick}>
         {t('Subcategories')}
        </Button>
        <Button variant="contained" color="error" onClick={handleShowProducts}>
          {t('Products')}
        </Button>
      </div>
      {error ? (
        <ErrorPage message={error} />
      ) : (
        <>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {state.showFilteredProducts && <FilteredProductList state={state} handleAddToCart={handleAddToCart}/>}
              {state.showCategories && <CategoryList isOpen={state.showCategories} toggle={toggleCategories} handleShowSubcategoryByCategoryId={handleShowSubcategoryByCategoryId} state={state} theme={theme} />}
              {state.showProducts && <ProductList isOpen={state.showProducts} toggle={toggleProducts} handleAddToCart={handleAddToCart} state={state} />}
              {state.showSubcategories && <SubcategoryList isOpen={state.showSubcategories} toggle={toggleSubcategories} handleShowProductsBySubcategory={handleShowProductsBySubcategory} state={state} theme={theme}/>}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductCatalog;
