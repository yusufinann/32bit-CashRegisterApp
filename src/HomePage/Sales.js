import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ProductCatalog from "../SalesPage/ProductCatalog/ProductCatalog";
import CartManagement from "../SalesPage/CartComponent/CartManagement";
import TransactionButtons from "../SalesPage/TransactionArea/TransactionButtons";
import './styles.css';
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useGlobalContext } from "../contexts/GlobalContext";

const Sales = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const {
    state,
    setState,
    handleShowCategories,
    handleShowProducts,
    handleSubCategoriesClick,
    handleShowProductsBySubcategory,
    handleShowSubcategoryByCategoryId,
    loading,
    error,
    handleBarcodeChange,
    handleChange,
    showAllProducts,
    setShowAllProducts,
  } = useGlobalContext();

  const paperStyles = {
    textAlign: 'center',
    overflow: 'auto',
    margin: '8px',
    border: theme === 'dark' ? '1px solid white' : '1px solid #2b2d42',
    backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    height: '100%',
  };

  return (
    <Grid container spacing={0.5} className={`SalesContainer ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Grid item xs={12}>
        <GlobalNavi
          title="Sales Page"
          linkTo="/home"
          icon={<TravelExploreTwoToneIcon className="iconStyle" />}
          something="See Price"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} sx={{ height: '90vh' }}>
        <Paper sx={paperStyles}>
          <ProductCatalog
            theme={theme}
            t={t}
            state={state}
            setState={setState}
            handleShowCategories={handleShowCategories}
            handleShowProducts={handleShowProducts}
            handleSubCategoriesClick={handleSubCategoriesClick}
            handleShowProductsBySubcategory={handleShowProductsBySubcategory}
            handleShowSubcategoryByCategoryId={handleShowSubcategoryByCategoryId}
            loading={loading}
            error={error}
            handleBarcodeChange={handleBarcodeChange}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={paperStyles}>
          <CartManagement theme={theme} t={t} />
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <Paper sx={paperStyles}>
          <Typography sx={{ marginTop: "32px", fontSize: "1.5rem" }} variant="h6">{t('Transaction Panel')}</Typography>
          <TransactionButtons
            theme={theme}
            t={t}
            setState={setState}
            state={state}
            handleChange={handleChange}
            showAllProducts={showAllProducts}
            setShowAllProducts={setShowAllProducts}
            handleShowProducts={handleShowProducts}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Sales;
