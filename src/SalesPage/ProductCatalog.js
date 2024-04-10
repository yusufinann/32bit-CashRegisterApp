import React from 'react';
import { TextField, Button} from '@mui/material';
import './styles.css'
import { useGlobalContext } from '../contexts/ClobalContext';
import CategoryList from './CategoryList';

const ProductCatalog = () => {

    const { state, handleBarcodeChange, handleShowCategories } = useGlobalContext();
  return (
    <div>
      <form>
        <TextField
          id="barcodeInput"
          label="Barkod giriniz"
          variant="outlined"
          value={state.barcode}
          onChange={handleBarcodeChange}
          fullWidth
          style={{ marginTop: 10 }}
        />
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"            
            onClick={handleShowCategories}
          >
            Kategoriler
          </Button>
          <Button variant="contained" color="success"  onClick={() => {}}>
            Alt Kategoriler
          </Button>
          <Button
            variant="contained"
            color="error"
          >
            Ürünler
          </Button>
        </div>
      </form>

      {/* <FilteredProductList /> */}
      {state.showCategories && (
        <CategoryList  //CategoryList
          categories={state.categories}
        />
      )}
      {/* <ProductList /> */}
    </div>
  );
};

export default ProductCatalog;
