import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// StoreStatusContext'i oluştur
const StoreStatusContext = createContext();

// StoreStatusProvider bileşenini oluştur
export const StoreStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [workingHours, setWorkingHours] = useState({ start: '09:00', end: '18:00' });

  // Mağaza durumunu kontrol eden işlev
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

  // Bileşen yüklendiğinde `localStorage`'dan çalışma saatlerini al
  useEffect(() => {
    const storedWorkingHours = localStorage.getItem('workingHours');
    if (storedWorkingHours) {
      setWorkingHours(JSON.parse(storedWorkingHours));
    }
  }, []);

  // Çalışma saatleri değiştiğinde veya bileşen yüklendiğinde mağaza durumunu güncelle
  useEffect(() => {
    setIsOnline(isStoreOnline());
  }, [isStoreOnline]);

  return (
    <StoreStatusContext.Provider value={{ isOnline, setIsOnline, workingHours, setWorkingHours }}>
      {children}
    </StoreStatusContext.Provider>
  );
};

// Hook'u kullanarak StoreStatusContext'e erişim sağla
export const useStoreStatus = () => useContext(StoreStatusContext);
