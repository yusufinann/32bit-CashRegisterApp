import React, { useCallback, useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './styles.css'
import { useGlobalContext } from '../contexts/GlobalContext';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import FilteredProductList from './FilteredProductList';
import VirtualKeyboard from '../GlobalComponents/VirtualKeyboard';
import SubcategoryList from './SubcategoryList';
import { useKeyboardContext } from '../contexts/KeyboardContext';

const ProductCatalog = () => {

  const { state, setState, handleShowCategories, handleShowProducts, handleBarcodeChange,handleSubCategoriesClick} = useGlobalContext();
  const { handleClear } = useKeyboardContext();
  const [inputValue, setInputValue] = useState("");
   
  const handleBarcodeInputChange = (event) => {
    const value = event.target.value;
    handleBarcodeChange({ target: { value } });
  };
  const toggleProducts = useCallback(() => {
    setState(prevState => ({ ...prevState, showProducts: !prevState.showProducts }));
  }, [setState]);
 
  const toggleCategories = useCallback(() => {
    setState(prevState => ({ ...prevState, showCategories: !prevState.showCategories }));
  }, [setState]);

  const  toggleSubcategories = useCallback(() => {
    setState(prevState => ({ ...prevState, showSubcategories: !prevState.showSubcategories }));
  }, [setState]);

  const handleVirtualKeyboardPress = useCallback((value) => {
    handleBarcodeChange({ target: { value } });
    setInputValue(value);
  }, [handleBarcodeChange]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    handleBarcodeChange({ target: { value } });
  };
  return (
    <> 
   <TextField
        id="barcode"
        placeholder={"Giriş için tıklayın..."}
        onChange={handleBarcodeInputChange}
        fullWidth
        variant="outlined"
        InputProps={{
          style: { cursor: "pointer", color: "#dc143c" },
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
    {state.showFilteredProducts && state.barcode && <FilteredProductList />}
    {state.showCategories && <CategoryList isOpen={state.showCategories} toggle={toggleCategories} />}
    {state.showProducts && <ProductList isOpen={state.showProducts} toggle={toggleProducts} />}
    {state.showSubcategories && <SubcategoryList isOpen={state.showSubcategories} toggle={toggleSubcategories} />}
  </>
  );
};

export default ProductCatalog;
