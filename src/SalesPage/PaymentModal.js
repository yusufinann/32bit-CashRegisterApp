import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';

const Modal = ({ isOpen, handleClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }}>
        {children}
        <button onClick={handleClose} style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#FF5722', color: 'white', cursor: 'pointer' }}>Kapat</button>
      </div>
    </div>
  );
};

const Button = ({ onClick, children, color, style }) => {
  const buttonStyles = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    ...style
  };

  if (color === 'primary') {
    buttonStyles.backgroundColor = '#2196F3';
    buttonStyles.color = 'white';
  } else if (color === 'secondary') {
    buttonStyles.backgroundColor = '#FF5722';
    buttonStyles.color = 'white';
  }

  return (
    <button onClick={onClick} style={buttonStyles}>{children}</button>
  );
};

const PaymentModal = ({ isOpen, handleClose}) => {

    const { input,setPaymentType,Total,saveReceivedMoney,setPartialPayment,setInput} = useGlobalContext();

  const navigate = useNavigate();


  const handleNavigate = async () => {
    
    await saveReceivedMoney(); // Call saveReceivedMoney function
    setPartialPayment(true);
    setInput("");
    setPaymentType("Nakit&Kart");
    navigate('/price'); // Kullanıcıyı '/price' sayfasına yönlendir

  };
  
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <h2>Ödeme</h2>
      <p>Toplam tutar: {Total}</p>
      <p>Kalan tutar: {Total-input}</p>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={handleNavigate} color="primary" style={{ marginRight: '10px' }}>
          Kalan kısmı kart ile öde 
        </Button>
        <Button onClick={handleClose} color="secondary">
          Kapat
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
