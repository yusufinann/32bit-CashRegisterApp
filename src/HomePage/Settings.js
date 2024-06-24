import React from 'react';
import { Grid, Card, CardContent, Typography } from "@mui/material";
import GlobalNavi from "../GlobalComponents/GlobalNavi";
import StoreStatusUpdater from '../SettingsPage/StoreStatusUpdater';
import SwitchTheme from '../SettingsPage/SwitchTheme';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css'; // Import the CSS file
import ChangeLanguage from '../SettingsPage/ChangeLanguage';
import { useTranslation } from 'react-i18next';
import PrinterTest from '../SettingsPage/PrinterTest';

const Settings = () => {
  const { theme } = useTheme();
  const{t}=useTranslation();

  return (
    <Grid container spacing={2} className={`settings-container ${theme}`}>
      {/* Navi */}
      <Grid item xs={12} className="settings-navi">
        <GlobalNavi title="Settings Page" linkTo="/home" />
      </Grid>

      {/* Centered Settings Grid */}
      <Grid
        item
        xs={12}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={`settings-content ${theme}`}
      >
        <Card className="settings-card">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
             {t('Store Status Updater')}
            </Typography>
            <StoreStatusUpdater t={t} />
          </CardContent>
        </Card>
        <Card className="settings-card">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              {t('Switch Theme')}
            </Typography>
            <SwitchTheme t={t} />
          </CardContent>
        </Card>
        <Card className="settings-card">
          <CardContent>

            <PrinterTest t={t} />
          </CardContent>
        </Card>
        <ChangeLanguage/>
      </Grid>
    </Grid>
  );
};

export default Settings;
