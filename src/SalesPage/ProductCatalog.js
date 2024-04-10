import React from 'react';
import { TextField, Button} from '@mui/material';
import './styles.css'
import { useGlobalContext } from '../contexts/ClobalContext';
import CategoryList from './CategoryList';

const ProductCatalog = () => {

    const { state, handleBarcodeChange } = useGlobalContext();
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
      <CategoryList />
      {/* <ProductList /> */}
    </div>
  );
};

export default ProductCatalog;
