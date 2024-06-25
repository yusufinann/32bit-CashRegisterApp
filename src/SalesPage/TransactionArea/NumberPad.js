import React from 'react';
import { Button, Grid } from '@mui/material';

const buttonStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundColor: '#0E3F57',
  color: "white",
  fontWeight: "bold",
  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s',
  fontSize: '1.5rem',
  ':hover': {
    backgroundColor: '#FFD700',
  },

};

const NumberPad = ({ handleClick }) => {
  return (
    <>
      {[['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['0', '.', '00']].map((row, index) => (
        <Grid container spacing={1} key={index}>
          {row.map(value => (
            <Grid item xs={4} key={value} style={{ height: '70px' ,marginTop:"10px"}}>
              <Button color="primary" onClick={() => handleClick(value)} sx={buttonStyle}>{value}</Button>
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};

export default NumberPad;
