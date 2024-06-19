import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from '../contexts/ThemeContext';

const GlobalNavi = ({ title, linkTo,icon,something }) => {
  const {theme}=useTheme()
  
  return (
    <div style={{height:"55px",borderRadius:"8px", display: 'flex' ,alignItems: 'center',backgroundColor:theme==='dark'? 'black':'white' ,color:theme==='dark'? 'white':'black',border:theme==='dark'? '1px solid white':'1px solid black'}}>
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
