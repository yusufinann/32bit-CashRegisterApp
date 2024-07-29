import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper} from '@mui/material';
import { LocalGroceryStore, Assignment, MonetizationOn, CollectionsBookmark, AlarmOn, Settings } from '@mui/icons-material';
import MenuButtons from '../GlobalComponents/MenuButtons';
import { useLogin } from '../contexts/LoginContext';
import './styles.css'; // Import the CSS file
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useStoreStatus } from '../contexts/StoreStatusContext';
import PersonnelInfo from './PersonelInfo';

const Home = () => {
    const { isLoggedIn, user } = useLogin();
    const { isOnline } = useStoreStatus();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!user) {
        return <Typography>Loading...</Typography>;
      }
    return  (
        <div className={`HomeContainer ${theme === 'dark' ? 'dark' : 'light'}`}>
          <Paper className={`CustomPaper ${theme === 'dark' ? 'dark' : 'light'}`}>
            {isLoggedIn ? (
              <PersonnelInfo formattedTime={formattedTime} />
            ) : (
              <Typography variant="body1" gutterBottom>
                {t('Please Log In')}
              </Typography>
            )}
          </Paper>
    
            <Container className={`MainContainer ${theme === 'dark' ? 'dark' : 'light'}`} component="main" maxWidth="md">
                <Typography className="TitleTypography" sx={{ marginTop: '10vh' }} variant="h4" gutterBottom>
                    {t('Welcome To Home Page')}
                </Typography>
                <Grid container spacing={3} sx={{ marginTop: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MenuButtons
                        title="Sales Page"
                        linkTo="/sales"
                        icon={<LocalGroceryStore />}
                        color='#1976D2'
                        disabled={!isOnline}
                        className={`GridItem ${theme}`}
                        t={t}
                    />
                    <MenuButtons
                        title="Product Entry"
                        // linkTo="/product-entry"
                        icon={<Assignment />}
                        color='#E91E63'
                        className={`GridItem ${theme}`}
                    />
                    <MenuButtons
                        title="Rebate Procedures"
                        // linkTo="/rebate-procedures"
                        icon={<MonetizationOn />}
                        color='#673AB7'
                        className={`GridItem ${theme}`}
                    />
                    <MenuButtons
                        title="RECEIPTS"
                        linkTo="/receipts"
                        icon={<CollectionsBookmark />}
                        color='#FFC107'
                        className={`GridItem ${theme}`}
                    />
                    <MenuButtons
                        title="REPORTS"
                        linkTo="/reports"
                        icon={<AlarmOn />}
                        color='#FF5722'
                        className={`GridItem ${theme}`}
                    />
                    <MenuButtons
                        title="SETTINGS"
                        linkTo="/settings"
                        icon={<Settings />}
                        color='#795548'
                        className={`GridItem ${theme}`}
                    />
                </Grid>
            </Container>
        </div>
    );
}

export default Home;
