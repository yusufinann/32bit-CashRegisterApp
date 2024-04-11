import React from 'react'
import { Grid } from "@mui/material";
import GlobalNavi from '../GlobalComponents/GlobalNavi';
import ReceiptArea from './ReceiptArea';
const OrderSummary = () => { //see price
  return (
    <Grid container spacing={2}>
     {/*Navi */}
    <Grid
      item
      xs={12}
      style={{  border: "1px solid #2b2d42" }}
    >
      <GlobalNavi  title="See Price" linkTo="/sales" />
    </Grid>
    
    <Grid
        item
        xs={12} // Full width on small screens
        sm={4} // Five columns on medium screens and larger
        style={{
          margin: 10,
          border: "1px solid #2b2d42",
          borderRadius: 20,
          height: "85vh", // Set a fixed height
          overflow: "auto", // Enable scrolling
        }}
      >
        <ReceiptArea/>
      </Grid>

      {/* CartList */}
      <Grid
        item
        xs={12} // Full width on small screens
        sm={4} // Four columns on medium screens and larger
        style={{
          margin: 10,
          border: "1px solid #2b2d42",
          borderRadius: 20,
          height: "85vh", // Set a fixed height
          
        }}
      >
        {/* middle area for order summary */}
      </Grid>

      <Grid
        item
        xs={12} // Full width on small screens
        sm={3} // Two columns on medium screens and larger
        style={{
          margin: 10,
          border: "1px solid #2b2d42",
          borderRadius: 20,
          height: "85vh", // Set a fixed height
        }}
      >
        <div>
          {/* component */}
        </div>
      </Grid>
    </Grid>
  )
}

export default OrderSummary
