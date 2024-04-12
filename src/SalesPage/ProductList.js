
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { useGlobalContext } from '../contexts/GlobalContext';
import GlobalCardList from '../GlobalComponents/GlobalCardList';



const ProductList = ({ products }) => {
  const {handleAddToCart } = useGlobalContext();

  return (
    <div>
        <GlobalCardList array={products} AddToCartFunction={handleAddToCart} />
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;