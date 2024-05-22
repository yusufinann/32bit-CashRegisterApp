import React from 'react';
//import PropTypes from 'prop-types';
import '../GlobalComponents/CardList.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import GlobalCardList from '../GlobalComponents/GlobalCardList';
import { useCartContext } from '../contexts/CartContext';


const ProductList = () => {
  const {state } = useGlobalContext();
  
  const { handleAddToCart } = useCartContext();

  return (
    <div>
        <GlobalCardList array={state.products} AddToCartFunction={handleAddToCart} />
    </div>
  );
};

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default ProductList;