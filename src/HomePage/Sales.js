import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import GlobalNavi from "../GlobalComponents/GlobalNavi";

const Sales = () => {
    const navigate = useNavigate();
    const somethingText = "See Price";

    const handleIconClick = () => {
        // İkon tıklandığında anasayfaya yönlendirme
        navigate('/price');
      };
  return (
    <Grid container spacing={2}>
       
      <Grid item xs={12} style={{ border: "1px solid #2b2d42" }}>
      <GlobalNavi  title="Sales Page" linkTo="/home" icon={<TravelExploreTwoToneIcon onClick={handleIconClick} style={{ fontSize: '3rem' }} />} something={somethingText} />
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
