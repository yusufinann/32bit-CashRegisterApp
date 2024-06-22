import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ProductCatalog from "../SalesPage/ProductCatalog";
import CartManagement from "../SalesPage/CartComponent/CartManagement";
import TransactionButtons from "../SalesPage/TransactionButtons";
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import './styles.css';
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme, appTheme }) => ({
  textAlign: 'center',
  overflow: "auto",
  margin: theme.spacing(1),
  border: appTheme === 'dark' ? "1px solid white" : "1px solid #2b2d42",
  backgroundColor: appTheme === 'dark' ? '#121212' : '#ffffff',
  color: appTheme === 'dark' ? '#ffffff' : '#000000',
  height: '100%', // Ensure each item takes full height within its grid cell
}));

const Sales = () => {
  const navigate = useNavigate();
  const { theme: appTheme } = useAppTheme();

  const handleIconClick = () => {
    navigate('/price');
  };
  const { t } = useTranslation();

  return (
    <Grid container spacing={0.5} className={`SalesContainer ${appTheme === 'dark' ? 'dark' : 'light'}`}>
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
        <Item appTheme={appTheme}><ProductCatalog appTheme={appTheme} t={t} /></Item>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Item style={{ color: appTheme === 'dark' ? 'blue' : 'black', backgroundColor: appTheme === 'dark' ? '#3C3C3C' : 'white' }}><CartManagement appTheme={appTheme} t={t} /></Item>
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <Item appTheme={appTheme}>
          <Typography sx={{ marginTop: "32px", fontSize: "1.5rem" }} variant="h6">{t('Transaction Panel')}</Typography>
          <TransactionButtons appTheme={appTheme} t={t} />
        </Item>
      </Grid>
    </Grid>
  );
};

export default Sales;
