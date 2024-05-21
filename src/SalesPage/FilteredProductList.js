import React from 'react';
import { Typography } from '@mui/material'; // Import Material-UI components
import { useGlobalContext } from '../contexts/GlobalContext';
import './styles.css';
import GlobalCardList from '../GlobalComponents/GlobalCardList';
import { useCartContext } from '../contexts/CartContext';

const FilteredProductList = () => {
    const { state } = useGlobalContext();
    const {  handleAddToCart } = useCartContext();
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
