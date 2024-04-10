import React from 'react';
import { TextField, Button} from '@mui/material';
import './styles.css'

const ProductCatalog = () => {
  return (
    <div>
      <form>
        <TextField
          id="barcodeInput"
          label="Barkod giriniz"
          variant="outlined"
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
          <Button variant="contained" color="success">
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

      {/*<FilteredProductList />
      <CategoryList />
      <ProductList />*/}
    </div>
  );
};

export default ProductCatalog;
