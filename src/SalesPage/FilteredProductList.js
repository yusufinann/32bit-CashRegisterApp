import React from 'react';
import './styles.css';
import GlobalCardList from '../GlobalComponents/GlobalCardList/GlobalCardList';

const FilteredProductList = ({state,handleAddToCart}) => {
    return (
        <div>
            <GlobalCardList array={state.filteredProducts} AddToCartFunction={handleAddToCart} />
        </div>
    );
};

export default FilteredProductList;
