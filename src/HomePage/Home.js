import React from 'react';
import { Container, Typography, Grid, styled} from '@mui/material';
import { LocalGroceryStore,Assignment,MonetizationOn, CollectionsBookmark,AlarmOn, Settings   } from '@mui/icons-material';
import MenuButtons from '../GlobalComponents/MenuButtons';



const MainContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: `url('your-background-image.jpg') center/cover no-repeat`, // Replace with your background image
    color: '#fff', // Set text color to white
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', // Add a subtle shadow for depth
    textAlign: 'center', // Center-align text
});
// ...

const TitleTypography = styled(Typography)({
    variant: 'h4',
    marginBottom: '10px', // Adjust the margin to provide space without pushing content too far down
    color: 'black',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
});


const Home = () => {
    return (
        <MainContainer component="main" maxWidth="md">
             <TitleTypography gutterBottom>
                Welcome to Home Page
                </TitleTypography>
            <Grid container spacing={3} justifyContent="center">

            <MenuButtons 
                        title="Sales Page" 
                        linkTo="/sales" 
                        icon={<LocalGroceryStore/>}
                        color='#1976D2'
                    />
                       <MenuButtons 
                        title="Product Entry" 
                        linkTo="/product-entry" 
                        icon={<Assignment/>}
                        color='#E91E63'
                    />
                       <MenuButtons 
                        title="Rebate Procedures" 
                        linkTo="/rebate-procedures" 
                        icon={<MonetizationOn/>}
                        color='#673AB7'
                    />
                       <MenuButtons 
                        title="COLLECTIONS" 
                        linkTo="/collections" 
                        icon={<CollectionsBookmark/>}
                        color='#FFC107'
                    />
                       <MenuButtons 
                        title="REPORTS" 
                        linkTo="/reports" 
                        icon={<AlarmOn/>}
                        color='#FF5722'
                    />
                       <MenuButtons 
                        title="SETTINGS" 
                        linkTo="/settings" 
                        icon={  <Settings/>}
                        color='#795548'
                    />
                
                
                {/* Diğer menü düğmeleri buraya eklenebilir */}
              {/* Menu Buttons */}
                </Grid>
                </MainContainer>
    );
}

export default Home;
