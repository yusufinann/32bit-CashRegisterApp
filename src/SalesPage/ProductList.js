
import React from 'react';
//import PropTypes from 'prop-types';
import './styles.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import GlobalCardList from '../GlobalComponents/GlobalCardList';


const ProductList = () => {
  const {handleAddToCart,state } = useGlobalContext();

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