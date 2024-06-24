import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ProductCatalog from "../SalesPage/ProductCatalog";
import CartManagement from "../SalesPage/CartComponent/CartManagement";
import TransactionButtons from "../SalesPage/TransactionButtons";
import './styles.css';
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const Sales = () => {
  const navigate = useNavigate(); 
  const {theme} = useTheme();
  const { t } = useTranslation();

  const handleIconClick = () => {
    navigate('/price');
  };

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
          icon={
            <Button onClick={handleIconClick}>
              <TravelExploreTwoToneIcon className="iconStyle" />
            </Button>
          }
          something="See Price"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} sx={{ height: '90vh' }}>
        <Paper sx={paperStyles}>
          <ProductCatalog theme={theme} t={t} />
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
          <TransactionButtons theme={theme} t={t} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Sales;
