import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const GlobalNavi = ({ title, linkTo,icon,something }) => {
  return (
    <div style={{ display: 'flex' ,alignItems: 'center'}}>
      <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ArrowBackIosIcon style={{ fontSize: '2rem' }} />
      </Link>
      
      <h2 style={{margin: '0 auto' }}>{title}</h2>
      <h3 >{something}</h3>
      {icon && <div style={{ marginLeft: '10px'  }}>{icon}</div>}
    </div>
  );
};

export default GlobalNavi;
