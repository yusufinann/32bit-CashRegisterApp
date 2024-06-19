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

const Item = styled(Paper)(({ theme, appTheme }) => ({
  textAlign: 'center',
  overflow: "auto",
  margin: theme.spacing(1),
  border: appTheme === 'dark' ? "1px solid white":"1px solid #2b2d42",
  backgroundColor: appTheme === 'dark' ? '#121212' : '#ffffff',
  color: appTheme === 'dark' ? '#ffffff' : '#000000',
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
  const { theme: appTheme } = useAppTheme();

  const handleIconClick = () => {
    navigate('/price');
  };

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
      
      <Grid item xs={12} sm={4}>
        <Item  appTheme={appTheme}><ProductCatalog appTheme={appTheme}/></Item>
      </Grid>
     
      <Grid item xs={12} sm={4}>
        <Item style={{color: appTheme==='dark' ?  'blue' : 'black',backgroundColor:appTheme==='dark' ? '#3C3C3C':'white'}} ><CartManagement appTheme={appTheme}/></Item>
      </Grid>
      
      <Grid item xs={12} sm={4}>
        <Item appTheme={appTheme}>
          <Typography sx={{marginTop:"32px", fontSize:"1.5rem"}} variant="h6">Transaction Panel</Typography>
          <TransactionButtons appTheme={appTheme}/>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Sales;
