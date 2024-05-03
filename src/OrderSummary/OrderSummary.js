import React, { useState } from 'react'
import GlobalNavi from '../GlobalComponents/GlobalNavi'
import { Grid,  Typography,Paper,Button} from "@mui/material";
import ReceiptArea from './ReceiptArea';
import { styled } from "@mui/material/styles";
import CartManagement from '../SalesPage/CartManagement';
import OrderSummaryButtons from './OrderSummaryButtons';
import Ereceipt from '../OrderSummary/Ereceipt';

const OrderSummary = () => {
  const [open, setOpen] = useState(false); // Ereceipt bileşeninin açılıp kapanmasını kontrol eden state
  const [email, setEmail] = useState(""); // setEmail fonksiyonunu tanımlayın

  const handleOpenEreceipt = () => {
    setOpen(true); // Ereceipt bileşenini aç
  };

  const handleCloseEreceipt = () => {
    setOpen(false); // Ereceipt bileşenini kapat
  };

  const handleSendReceipt = () => {
    
    console.log("E-receipt sent to:", email);
    setOpen(false);
  };

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

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} style={{ border: "1px solid #2b2d42" }}>
        <GlobalNavi title="See Price" linkTo="/sales" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Item>
          <ReceiptArea />
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
          <OrderSummaryButtons />
          <Button variant="contained" color="primary" onClick={handleOpenEreceipt}>E-Receipt</Button>
        </Item>
      </Grid>
      {/* Ereceipt bileşeni, "open" prop'unu ve açma/kapama fonksiyonlarını geçirin */}
      <Ereceipt
        open={open} 
        handleClose={handleCloseEreceipt} 
        handleSendReceipt={handleSendReceipt} 
        setEmail={setEmail} // setEmail fonksiyonunu geçirin
        email={email} 
      />
    </Grid>
  )
}

export default OrderSummary;

