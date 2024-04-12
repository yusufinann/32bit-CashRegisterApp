import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import GlobalCardList from '../GlobalComponents/GlobalCardList';

const ProductSearchResult = () => {
  const {state,handleAddToCart } = useGlobalContext();
   
    return (
      <div>
         <GlobalCardList array={state.wantedProduct} AddToCartFunction={handleAddToCart} />   
      </div>
    );
};

export default ProductSearchResult;
