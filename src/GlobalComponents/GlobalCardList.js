import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import './CardList.css'

const GlobalCardList = ({ array, AddToCartFunction }) => {
  const campaignStyles = {
    C001: "3 Al 2 Öde",
    C002: "Etiketin Yarısı",
    C003: "%10 indirim"
  };
  return (
    <div className="card-container">
      {array.map((arr) => (
        <Card key={arr.product_id} sx={{ width: 150, position: 'relative', overflow: 'visible' }} className="custom-card" onClick={() => AddToCartFunction(arr)}>
          {arr.campaign_state === 1 && (
            <div className="campaign-badge">
              Kampanya!
            </div>
          )}
          {campaignStyles[arr.campaign_id] && (
  <div className="special-offer-ribbon">
    {campaignStyles[arr.campaign_id]}
  </div>
)}
          <CardMedia
            component="img"
            alt={arr.product_name}
            height="150"
            image={arr.image_url}
          />
          <CardContent>
            <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
              {arr.product_name}
            </Typography>
            <Typography variant="body1">
              Price: {arr.price} TL
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default GlobalCardList;
