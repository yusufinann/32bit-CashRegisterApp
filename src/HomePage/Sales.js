import React from "react";
import { Grid, Paper, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ProductCatalog from "../SalesPage/ProductCatalog";
import CartManagement from "../SalesPage/CartComponent/CartManagement";
import TransactionButtons from "../SalesPage/TransactionButtons";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  overflow: "auto",
  margin: theme.spacing(1),
  border: "1px solid #2b2d42",
  [theme.breakpoints.up('xs')]: {
    height: '70vh',
  },
  [theme.breakpoints.up('sm')]: {
    height: '85vh',
  },
  [theme.breakpoints.up('md')]: {
    height: '85vh',
  }
}));

const Sales = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  const handleIconClick = () => {
    navigate('/price');
  };

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} style={{ border: "1px solid #2b2d42" }}>
        <GlobalNavi
          title="Sales Page"
          linkTo="/home"
          icon={
            <Button onClick={handleIconClick}>
              <TravelExploreTwoToneIcon style={{ fontSize: '3rem' }} />
            </Button>
          }
          something="See Price"
        />
      </Grid>
      
      <Grid item xs={12} sm={4}>
        <Item><ProductCatalog/></Item>
      </Grid>
     
      <Grid item xs={12} sm={4}>
        <Item><CartManagement/></Item>
      </Grid>
      
      <Grid item xs={12} sm={4}>
        <Item>
          <Typography variant="h6">Transaction Panel</Typography>
          <TransactionButtons/>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Sales;
