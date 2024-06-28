import React from 'react';
import { Typography } from '@mui/material'; // Import Material-U
import './styles.css';
import GlobalCardList from '../GlobalComponents/GlobalCardList';

const FilteredProductList = ({state,handleAddToCart}) => {
    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Filtered Products
            </Typography>
            <GlobalCardList array={state.filteredProducts} AddToCartFunction={handleAddToCart} />
        </div>
    );
};

export default FilteredProductList;
