import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { IconButton, Paper, styled } from '@mui/material';

const StyledIconButton = styled(IconButton)({
    borderRadius: '10%',
    width: '150px',
    height: '150px',
    margin: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});


// ...
const ButtonTypography = styled(Typography)({
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '10px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
});

// Update StyledPaper to make it more transparent and blend with the background
const StyledPaper = styled(Paper)({
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Use an rgba color for transparency
    borderRadius: '15px',
    backdropFilter: 'blur(10px)', // Apply a blur effect for a frosted glass appearance
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)',
    },
});
const MenuButtons = ({ title, linkTo, icon, color }) => {
    return (
     
        <Grid item>
            <Link to={linkTo}>
                <StyledPaper elevation={3} style={{ backgroundColor: color }}>
                    <StyledIconButton color="primary">
                    {React.cloneElement(icon, { style: { fontSize: '2.5rem', color: '#fff' } })}
               
                    </StyledIconButton>
                    <ButtonTypography>{title}</ButtonTypography>
                </StyledPaper>
            </Link>
        </Grid>
        
    );
};

export default MenuButtons;
