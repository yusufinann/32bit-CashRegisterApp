import React, { useEffect, useState } from "react";
import { Typography, Paper, Box, Avatar } from "@mui/material";
import LogoutButton from "../LoginPage/LogoutButton";
import ShopStatus from "../ShopStatus";
import IPDisplay from "../services/IPDisplay";
import { useLogin } from "../contexts/LoginContext";

import "./styles.css"; // styles.css dosyasını ekliyoruz
const PersonelInfo = () => {
  const { isLoggedIn, user } = useLogin();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the current time to display hours and minutes
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
   <>
      <Paper className="paper">
        {isLoggedIn ? (
          <Box textAlign="center">
            <ShopStatus />
            <Box className="avatar-container">
              <Avatar
                alt={user.personelInfo.name}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
              <LogoutButton />
            </Box>
            <Typography variant="h6" gutterBottom className="title-typography">
              Hoş geldiniz, {user.username}!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Personel: {user.personelInfo.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Kasa Konumu: {user.kasaInfo.location}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              className="time-typography"
            >
              Sistem Saati: {formattedTime}
            </Typography>
            <IPDisplay />
          </Box>
        ) : (
          <Typography variant="body1" gutterBottom className="login-message">
            Lütfen giriş yapın
          </Typography>
        )}
      </Paper>
      </>
  );
};

export default PersonelInfo;
