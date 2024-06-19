import React, { useCallback } from 'react';
import { Button, TextField, IconButton, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './styles.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import FilteredProductList from './FilteredProductList';
import SubcategoryList from './SubcategoryList';
import { useKeyboardContext } from '../contexts/KeyboardContext';
import ErrorPage from '../GlobalComponents/ErrorPage';
import { useCartContext } from '../contexts/CartContext';

const ProductCatalog = ({ appTheme }) => {
  const { state, setState, handleShowCategories, handleShowProducts, handleBarcodeChange, handleSubCategoriesClick, handleShowSubcategoryByCategoryId, handleShowProductsBySubcategory, loading, error } = useGlobalContext();
  const { handleClear } = useKeyboardContext();
  const { handleAddToCart } = useCartContext();

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
        placeholder="Giriş için tıklayın..."
        onChange={handleBarcodeInputChange}
        fullWidth
        variant="outlined"
        sx={{
          input: { cursor: "pointer", color: appTheme === 'dark' ? 'white' : 'black'},
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: appTheme === 'dark' ? 'red' : 'default',
            },
            '&:hover fieldset': {
              borderColor: appTheme === 'dark' ? 'red' : 'default',
            },
            '&.Mui-focused fieldset': {
              borderColor: appTheme === 'dark' ? 'red' : 'default',
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
          Kategoriler
        </Button>
        <Button variant="contained" color="success" onClick={handleSubCategoriesClick}>
          Alt Kategoriler
        </Button>
        <Button variant="contained" color="error" onClick={handleShowProducts}>
          Ürünler
        </Button>
      </div>
      {error ? (
        <ErrorPage message={error} />
      ) : (
        <>
          {loading && <CircularProgress />}
          {state.showFilteredProducts && state.barcode && <FilteredProductList />}
          {state.showCategories && <CategoryList isOpen={state.showCategories} toggle={toggleCategories} handleShowSubcategoryByCategoryId={handleShowSubcategoryByCategoryId} state={state} />}
          {state.showProducts && <ProductList isOpen={state.showProducts} toggle={toggleProducts} handleAddToCart={handleAddToCart} state={state} />}
          {state.showSubcategories && <SubcategoryList isOpen={state.showSubcategories} toggle={toggleSubcategories} handleShowProductsBySubcategory={handleShowProductsBySubcategory} state={state} />}
        </>
      )}
    </>
  );
};

export default ProductCatalog;
