import React, { useEffect, useState, useCallback } from 'react';
import { useStoreStatus } from '../contexts/StoreStatusContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { t } from 'i18next';
import WorkingHoursForm from './WorkingHoursForm';


const StoreStatusUpdater = () => {
  const { setIsOnline, workingHours } = useStoreStatus();
  const { theme } = useTheme();
  const [showWorkingHours, setShowWorkingHours] = useState(false);
  const navigate = useNavigate();

  const isStoreOnline = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const { start, end } = workingHours;
    const [openingHour, openingMinute] = start.split(':').map(Number);
    const [closingHour, closingMinute] = end.split(':').map(Number);

    const isOpen =
      (hour > openingHour || (hour === openingHour && minute >= openingMinute)) &&
      (hour < closingHour || (hour === closingHour && minute < closingMinute));

    return isOpen;
  }, [workingHours]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsOnline(isStoreOnline());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setIsOnline, isStoreOnline]);

  const handleWorkingHoursClick = () => {
    setShowWorkingHours((prev) => !prev);
  };

  return (
    <>
      <Button variant="contained" onClick={handleWorkingHoursClick}>
        {t('Working Hours')}
      </Button>
      {showWorkingHours && (
        <WorkingHoursForm
          theme={theme}
          workingHours={workingHours}
          setShowWorkingHours={setShowWorkingHours}
          navigate={navigate}
          isStoreOnline={isStoreOnline}
        />
      )}
    </>
  );
};

export default StoreStatusUpdater;
