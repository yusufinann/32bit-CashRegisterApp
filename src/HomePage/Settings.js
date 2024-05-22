import React from 'react';
import { Grid } from "@mui/material";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import StoreStatusUpdater from '../SettingsPage/StoreStatusUpdater';

const Settings = () => {
  return (
    <Grid container spacing={2}>
      {/* Navi */}
      <Grid item xs={12} style={{ border: "1px solid #2b2d42" }}>
        <GlobalNavi title="Settings Page" linkTo="/home" />
      </Grid>

      {/* Centered Settings Grid */}
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
          
          <StoreStatusUpdater/>
      </Grid>
    </Grid>
  );
};

export default Settings;
