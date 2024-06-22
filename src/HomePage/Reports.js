import React from 'react';
import { Grid, Paper } from "@mui/material";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import Statistics from '../ReportsPage/Statistics';
import { useTheme } from '../contexts/ThemeContext';

const Reports = () => {
    const{theme}=useTheme();
    return (
        <Grid container spacing={2}>
            {/* Navi */}
            <Grid item xs={12}>
               
                    <GlobalNavi title="Reports Page" linkTo="/home" />
               
            </Grid>

            {/* Reports */}
            <Grid item xs={12} sm={12}>
                <Paper elevation={3} style={{ padding: 20, borderRadius: 10,backgroundColor:theme==='dark'? '#3c3c3c':'white' }}>
                    <Statistics theme={theme}/> 
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Reports;
