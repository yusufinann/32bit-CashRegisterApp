import React from 'react';
import { TextField, Button} from '@mui/material';
import './styles.css'
import { useGlobalContext } from '../contexts/ClobalContext';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

const ProductCatalog = () => {

    const {state, setState, handleShowCategories, handleShowProducts, handleBarcodeChange,  handleShowProductsByCategoryId } = useGlobalContext();
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
            onClick={handleShowProducts}
          >
            Ürünler
          </Button>
        </div>
      </form>

      {/* <FilteredProductList /> */}
      {state.showCategories && (
        <CategoryList  //CategoryList
          categories={state.categories}
          handleShowProducts={handleShowProductsByCategoryId}
        />
      )}
        {state.showProducts && (
        <ProductList
          products={state.products}
          isOpen={state.showProducts}
          toggle={() => setState({ ...state, showProducts: !state.showProducts })}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
