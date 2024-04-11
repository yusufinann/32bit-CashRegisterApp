import React from 'react'
import { Grid } from "@mui/material";
import GlobalNavi from '../GlobalComponents/GlobalNavi';
const OrderSummary = () => {
  return (
    <Grid container spacing={2}>
    
    <Grid
    item
    xs={12}
    style={{border: "1px solid #2b2d42" }}
  >
    <GlobalNavi  title="See Price" linkTo="/sales" />
  </Grid>
  
  <Grid
    item
    xs={12} // Full width on small screens
    sm={6}  // Half width on medium screens and larger
    style={{
      margin: '10px auto', // Center the grid
      border: "1px solid #2b2d42",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      
    }}
  >
    <h2>See Price</h2>
  </Grid>
    
 
</Grid>
)
}

export default OrderSummary