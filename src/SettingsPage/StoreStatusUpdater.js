import React, { useEffect, useState, useCallback } from 'react';
import { useStoreStatus } from '../contexts/StoreStatusContext';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StoreStatusUpdater = () => {
  const { setIsOnline, workingHours, setWorkingHours } = useStoreStatus();

  const [showWorkingHours, setShowWorkingHours] = useState(false);
  const navigate = useNavigate();

  const isStoreOnline = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const { start, end } = workingHours;
    const [openingHour, openingMinute] = start.split(":").map(Number);
    const [closingHour, closingMinute] = end.split(":").map(Number);

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
    setShowWorkingHours(prev => !prev);
  };

  const handleSaveWorkingHours = () => {
    localStorage.setItem('workingHours', JSON.stringify(workingHours));
    setIsOnline(isStoreOnline());
    setShowWorkingHours(false);
    navigate('/home');
  };

  const handleChangeStartTime = event => {
    setWorkingHours({ ...workingHours, start: event.target.value });
  };

  const handleChangeEndTime = event => {
    setWorkingHours({ ...workingHours, end: event.target.value });
  };

  return (
    <>
      <Button variant="contained" onClick={handleWorkingHoursClick}>
        Working Hours
      </Button>
      {showWorkingHours && (
        <div style={{ marginTop: '20px', width: '80%' }}>
          <TextField
            key={workingHours.start}
            id="start-time"
            label="Başlangıç Saati"
            type="time"
            value={workingHours.start}
            onChange={handleChangeStartTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <TextField
            id="end-time"
            label="Bitiş Saati"
            type="time"
            value={workingHours.end}
            onChange={handleChangeEndTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveWorkingHours}>
            Save
          </Button>
        </div>
      )}
    </>
  );
};

export default StoreStatusUpdater;
