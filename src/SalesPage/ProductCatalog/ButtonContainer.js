import React from 'react';
import { Button } from '@mui/material';

const ButtonContainer = ({ t, handleShowCategories, handleSubCategoriesClick, handleShowProducts }) => (
  <div className="button-container">
    <Button variant="contained" color="primary" onClick={handleShowCategories}>
      {t('Categories')}
    </Button>
    <Button variant="contained" color="success" onClick={handleSubCategoriesClick}>
      {t('Subcategories')}
    </Button>
    <Button variant="contained" color="error" onClick={handleShowProducts}>
      {t('Products')}
    </Button>
  </div>
);

export default ButtonContainer;
