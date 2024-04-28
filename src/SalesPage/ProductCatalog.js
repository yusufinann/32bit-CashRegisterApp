import React, { useCallback, useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './styles.css'
import { useGlobalContext } from '../contexts/GlobalContext';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import FilteredProductList from './FilteredProductList';
import VirtualKeyboard from '../GlobalComponents/VirtualKeyboard';

const ProductCatalog = () => {

  const { state, setState, handleShowCategories, handleShowProducts, handleBarcodeChange,setIsKeyboardOpen ,setKeyboardPosition} = useGlobalContext();
  const [inputValue, setInputValue] = useState("");
   
  const handleInputClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setIsKeyboardOpen(true);
    setKeyboardPosition({ x: rect.left, y: rect.bottom });
  };

  const toggleProducts = useCallback(() => {
    setState(prevState => ({ ...prevState, showProducts: !prevState.showProducts }));
  }, [setState]);
 
  const toggleCategories = useCallback(() => {
    setState(prevState => ({ ...prevState, showCategories: !prevState.showCategories }));
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
      value={inputValue}
      placeholder={"Giriş için tıklayın..."}
      onClick={handleInputClick}
      onChange={handleInputChange}
      fullWidth
      variant="outlined"
      InputProps={{
        style: { cursor: "pointer", color: "#dc143c" }, // kırmızı metin rengi
        endAdornment: (
          <IconButton onClick={() => setInputValue("")} style={{ color: "#dc143c" }}>
            <ClearIcon /> {/* Temizleme simgesi */}
          </IconButton>
        ),
      }}
      InputLabelProps={{
        style: { color: "#dc143c" }, // kırmızı etiket rengi
      }}
    />
    <VirtualKeyboard
      onInputChange={setInputValue}
      KeyboardPress={handleVirtualKeyboardPress}
    />
    <div className="button-container">
      <Button variant="contained" color="primary" onClick={handleShowCategories}>
        Kategoriler
      </Button>
      <Button variant="contained" color="success">
        Alt Kategoriler
      </Button>
      <Button variant="contained" color="error" onClick={handleShowProducts}>
        Ürünler
      </Button>
    </div>
    {state.showFilteredProducts && state.barcode && <FilteredProductList />}
    {state.showCategories && <CategoryList isOpen={state.showCategories} toggle={toggleCategories} />}
    {state.showProducts && <ProductList isOpen={state.showProducts} toggle={toggleProducts} />}
   
  </>
  );
};

export default ProductCatalog;
