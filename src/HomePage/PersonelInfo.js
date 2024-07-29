// PersonnelInfo.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import LogoutButton from '../LoginPage/LogoutButton';
import ShopStatus from '../ShopStatus';
import IPDisplay from '../services/IPDisplay';
import { useLogin } from '../contexts/LoginContext';
import { useTranslation } from 'react-i18next';
import {
  calculateSalesAmount,
} from '../ReportsPage/StatisticFunctions';
import { useCartContext } from '../contexts/CartContext';

const PersonnelInfo = ({ formattedTime }) => {
  const {user } = useLogin();
  const { t } = useTranslation();
  const { receipts } = useCartContext();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
      if (receipts) {
          const totalSalesAmount = calculateSalesAmount(receipts);
          setBalance(totalSalesAmount);
      }
  }, [receipts]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="CustomBox">
      <ShopStatus t={t} />
      <Box className="AvatarContainer">
        {user?.personelInfo?.name && (
          <Avatar
            alt={user.personelInfo.name}
            src=""
            sx={{ width: 100, height: 100, margin: '0 auto' }}
          />
        )}
        <LogoutButton />
      </Box>
      <Typography variant="h6" gutterBottom mt={2}>
        {t('welcome')}, {user?.personelInfo?.name || 'Guest'}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('Personel')}: {user?.personelInfo?.name || 'N/A'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('Sales location')}: {user?.kasaInfo?.location || 'N/A'}
      </Typography>  <Typography variant="subtitle1" gutterBottom>
                    {t(` Balance `)} : {balance} TL
                </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        {t('System Time')}: {formattedTime}
      </Typography>
      <IPDisplay />
    </Box>
  );
};

export default PersonnelInfo;
