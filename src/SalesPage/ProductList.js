import React from 'react';
//import PropTypes from 'prop-types';
import '../GlobalComponents/CardList.css';
import GlobalCardList from '../GlobalComponents/GlobalCardList';


const ProductList = ({ handleAddToCart,state }) => { 
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