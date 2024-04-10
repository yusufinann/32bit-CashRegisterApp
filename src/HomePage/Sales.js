import React from "react";
import { Grid } from "@mui/material";

const Sales = () => {
  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12} style={{ border: "1px solid #2b2d42" }}>
       {/* Navi component*/}
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
        {/* ProductCatalog component */}
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
        {/* MidComponent */}
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
          {/* CheckoutPanel component */}
        </div>
      </Grid>
    </Grid>
  );
};

export default Sales;
