import React from 'react'
import GlobalNavi from '../GlobalComponents/GlobalNavi'
import { Grid,  Typography,Paper} from "@mui/material";
import ReceiptArea from './ReceiptArea';
import { styled } from "@mui/material/styles";
import CartManagement from '../SalesPage/CartManagement';
import OrderSummaryButtons from './OrderSummaryButtons';
const OrderSummary = () => { //see price

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    overflow: "auto",
    margin: theme.spacing(1),
    //borderRadius: 10,
    border: "1px solid #2b2d42",
    
    // Medya sorguları kullanarak responsive yükseklik ayarla
    [theme.breakpoints.up('xs')]: {
      height: '70vh', // Küçük cihazlarda
    },
    [theme.breakpoints.up('sm')]: {
      height: '85vh', // Orta büyüklükteki cihazlarda
    },
    [theme.breakpoints.up('md')]: {
      height: '85vh', // Büyük cihazlarda
    }
  }));
  
  return (
<Grid container spacing={0.5}>
      <Grid item xs={12} style={{border: "1px solid #2b2d42"}}>        
       
      <GlobalNavi  title="See Price" linkTo="/sales" />
      </Grid>
      <Grid item xs={12} sm={4} >
        <Item>
        <ReceiptArea/>
        </Item>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Item>
          <CartManagement />
        </Item>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Item>
          <Typography variant="h6">İşlem Paneli</Typography>
         {/* Right component */}
         <OrderSummaryButtons/>
        </Item>
      </Grid>
    </Grid>
  )
}

export default OrderSummary
