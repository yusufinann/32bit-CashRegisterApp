import React from 'react';
import { Grid, Paper } from "@mui/material";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import Statistics from '../ReportsPage/Statistics';

const Reports = () => {
    return (
        <Grid container spacing={2}>
            {/* Navi */}
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: 10 }}>
                    <GlobalNavi title="Reports Page" linkTo="/home" />
                </Paper>
            </Grid>

            {/* Reports */}
            <Grid item xs={12} sm={12}>
                <Paper elevation={3} style={{ padding: 20, borderRadius: 10,backgroundColor:'#f2f2f2' }}>
                    <Statistics /> 
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Reports;
