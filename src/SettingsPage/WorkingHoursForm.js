import React from 'react';
import { Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { t } from 'i18next';
import { useStoreStatus } from '../contexts/StoreStatusContext';
import './StoreStatusUpdater.css'

const WorkingHoursForm = ({ theme, workingHours, setShowWorkingHours, navigate, isStoreOnline }) => {
  const { setWorkingHours, setIsOnline } = useStoreStatus();

  const handleSaveWorkingHours = () => {
    const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeFormatRegex.test(workingHours.start) || !timeFormatRegex.test(workingHours.end)) {
      alert(t('Please enter valid time format HH:MM'));
      return;
    }

    localStorage.setItem('workingHours', JSON.stringify(workingHours));
    setIsOnline(isStoreOnline());
    setShowWorkingHours(false);
    navigate('/home');
  };

  const handleChangeStartTime = (event) => {
    setWorkingHours({ ...workingHours, start: event.target.value });
  };

  const handleChangeEndTime = (event) => {
    setWorkingHours({ ...workingHours, end: event.target.value });
  };

  return (
    <div className={`container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <label className="label" htmlFor="start-time">
        <AccessTimeIcon className="icon" /> {t('Start Time')}
      </label>
      <input
        className={`input ${theme === 'dark' ? 'dark-theme' : ''}`}
        id="start-time"
        placeholder="HH:MM"
        type="text"
        value={workingHours.start}
        onChange={handleChangeStartTime}
      />
      <label className="label" htmlFor="end-time">
        <AccessTimeIcon className="icon" /> {t('End Time')}
      </label>
      <input
        className={`input ${theme === 'dark' ? 'dark-theme' : ''}`}
        id="end-time"
        placeholder="HH:MM"
        type="text"
        value={workingHours.end}
        onChange={handleChangeEndTime}
      />
      <Button variant="contained" color="primary" onClick={handleSaveWorkingHours}>
        {t('Save')}
      </Button>
    </div>
  );
};

export default WorkingHoursForm;
