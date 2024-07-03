import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { IconButton, Paper, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

const ButtonTypography = styled(Typography)({
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '10px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
});

const StyledPaper = styled(Paper)({
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)',
    },
});

const MenuButtons = ({ title, linkTo, icon, color, disabled }) => {
    const { t } = useTranslation();

    const handleClick = () => {
        if (disabled) {
            alert(t('Store is currently offline. Please try again later.'));
        }
    };

    return (
        <Grid item>
            {disabled ? (
                <StyledPaper elevation={3} style={{ backgroundColor: '#9e9e9e', cursor: 'not-allowed' }}>
                    <StyledIconButton color="primary" onClick={handleClick}>
                        {React.cloneElement(icon, { style: { fontSize: '2.5rem', color: '#fff' } })}
                    </StyledIconButton>
                    <ButtonTypography>{t(title)}</ButtonTypography>
                </StyledPaper>
            ) : (
                <Link to={linkTo}>
                    <StyledPaper elevation={3} style={{ backgroundColor: color }}>
                        <StyledIconButton color="primary">
                            {React.cloneElement(icon, { style: { fontSize: '2.5rem', color: '#fff' } })}
                        </StyledIconButton>
                        <ButtonTypography>{t(title)}</ButtonTypography>
                    </StyledPaper>
                </Link>
            )}
        </Grid>
    );
};

export default MenuButtons;