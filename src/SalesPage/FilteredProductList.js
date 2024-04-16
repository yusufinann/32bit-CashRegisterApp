import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material'; // Import Material-UI components
import { useGlobalContext } from '../contexts/GlobalContext';
import './styles.css';
import GlobalCardList from '../GlobalComponents/GlobalCardList';

const FilteredProductList = () => {
    const { state,handleAddToCart } = useGlobalContext();

  
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Filtered Products
            </Typography>
            <GlobalCardList array={state.filteredProducts} AddToCartFunction={handleAddToCart} />          
        </div>
    );
   
};
FilteredProductList.propTypes = {
    filteredProducts: PropTypes.array.isRequired,
  };
export default FilteredProductList;
