import React, { useEffect, useState} from 'react';
import { useStoreStatus } from '../contexts/StoreStatusContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { t } from 'i18next';
import WorkingHoursForm from './WorkingHoursForm';


const StoreStatusUpdater = () => {
  const { setIsOnline, workingHours,isStoreOnline } = useStoreStatus();
  const { theme } = useTheme();
  const [showWorkingHours, setShowWorkingHours] = useState(false);
  const navigate = useNavigate();

 
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
