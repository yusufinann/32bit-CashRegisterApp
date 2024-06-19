import React from 'react';
import { Grid } from "@mui/material";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ReceiptList from '../ReceiptsPage/ReceiptList'
import { useTheme } from '../contexts/ThemeContext';
const Receipts = () => {
  const {theme}=useTheme();
    return (
        <Grid container spacing={2}>
      {/* Navi */}
      <Grid
        item
        xs={12}
        style={{ /* backgroundColor: "skyblue",*/ border: "1px solid #2b2d42" }}
      >
        <GlobalNavi  title="Receipts List Page" linkTo="/home" />
      </Grid>
      
      <Grid
        item
        xs={12} // Full width on small screens
        sm={6}  // Half width on medium screens and larger
        style={{
          margin: '10px auto', // Center the grid
          border: theme==='dark' ? "2px solid purple":"2px solid #2b2d42",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          
        }}
      >
        <ReceiptList/>
      </Grid>
        
     
    </Grid>
    );
}

export default Receipts;
