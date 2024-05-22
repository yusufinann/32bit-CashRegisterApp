import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, styled, Paper, Box, Avatar, Button} from '@mui/material';
import { LocalGroceryStore,Assignment,MonetizationOn, CollectionsBookmark,AlarmOn, Settings   } from '@mui/icons-material';
import MenuButtons from '../GlobalComponents/MenuButtons';
import { useLogin } from '../contexts/LoginContext';
import LogoutButton from '../LoginPage/LogoutButton';
import ShopStatus from '../ShopStatus';
import IPDisplay from '../services/IPDisplay';



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
const AvatarContainer = styled(Box)({
    position: 'relative',
    marginBottom: '20px',
});

const Home = () => {
    const { isLoggedIn, user } = useLogin();

 const [currentTime, setCurrentTime] = useState(new Date());
 useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the current time to display hours and minutes
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div>
        <Paper
            style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                padding: '20px',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}
        >
            {isLoggedIn ? (
               <Box textAlign="center">
               <ShopStatus />
               <AvatarContainer>
                 <Avatar
                   alt={user.personelInfo.name}
                   src="/static/images/avatar/1.jpg"
                   sx={{ width: 100, height: 100, margin: '0 auto' }}
                 />
                 <LogoutButton />
               </AvatarContainer>
               <Typography variant="h6" gutterBottom mt={2}>
                 Hoş geldiniz, {user.username}!
               </Typography>
               <Typography variant="subtitle1" gutterBottom>
                 Personel: {user.personelInfo.name}
               </Typography>
               <Typography variant="subtitle1" gutterBottom>
                 Kasa Konumu: {user.kasaInfo.location}
               </Typography>
               <Typography variant="subtitle1" gutterBottom>
                 Sistem Saati: {formattedTime}
               </Typography>
                <IPDisplay/> 
             </Box>
           ) : (
               <Typography variant="body1" gutterBottom>
                   Lütfen giriş yapın
               </Typography>
           )}
       </Paper>


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
                        title="RECEIPTS" 
                        linkTo="/receipts" 
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
                </div>
    );
}

export default Home;
