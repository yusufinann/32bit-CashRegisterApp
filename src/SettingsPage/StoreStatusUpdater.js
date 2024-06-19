import React, { useEffect, useState, useCallback } from 'react';
import { useStoreStatus } from '../contexts/StoreStatusContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styled from 'styled-components';
import './StoreStatusUpdater.css'; // Import your CSS file

const StoreStatusUpdater = () => {
  const { setIsOnline, workingHours, setWorkingHours } = useStoreStatus();
  const { theme } = useTheme();
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
        <div className={`container ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <label className="label" htmlFor="start-time">
            <AccessTimeIcon className="icon" /> Başlangıç Saati
          </label>
          <input
            className={`input ${theme === 'dark' ? 'dark-theme' : ''}`}
            id="start-time"
            type="time"
            value={workingHours.start}
            onChange={handleChangeStartTime}
          />
          <label className="label" htmlFor="end-time">
            <AccessTimeIcon className="icon" /> Bitiş Saati
          </label>
          <input
            className={`input ${theme === 'dark' ? 'dark-theme' : ''}`}
            id="end-time"
            type="time"
            value={workingHours.end}
            onChange={handleChangeEndTime}
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
