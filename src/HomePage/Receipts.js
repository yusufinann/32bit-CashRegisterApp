import React from 'react';
import { Grid} from "@mui/material";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import ReceiptList from '../ReceiptsPage/ReceiptList';
import { useTheme } from '../contexts/ThemeContext';

const Receipts = () => {
  const { theme } = useTheme();
  
  return (
    <Grid container spacing={2}>
      {/* Navi */}
      <Grid
        item
        xs={12}
        style={{ border: "1px solid #2b2d42", marginBottom: 20 }}
      >
        <GlobalNavi title="Receipts List Page" linkTo="/home" />
      </Grid>
      
      <Grid
        item
        xs={12} // Full width on small screens
        sm={10}  // Larger width on medium screens and larger
        md={8}  // Adjust width on medium to large screens
        lg={6}  // Adjust width on large screens
        style={{
          margin: '0 auto', // Center the grid
          padding: '20px',
          border: theme === 'dark' ? "2px solid purple" : "2px solid #2b2d42",
          borderRadius: 20,
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          height: "80vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: '100%' }}>
          <ReceiptList />
        </div>
      </Grid>
    </Grid>
  );
}

export default Receipts;
