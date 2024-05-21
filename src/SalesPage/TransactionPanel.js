import React, { useState } from "react";
import { Button, Input, Grid } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearIcon from '@mui/icons-material/Clear';
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from 'react-router-dom';
import PaymentModal from "./PaymentModal";
import { useCartContext } from "../contexts/CartContext";

const TransactionPanel = () => {

  const navigate = useNavigate();

  const { openCampaignModalFn  } = useGlobalContext();
  const {saveReceivedMoney,Total,input,setPaymentType,setInput,setPartialPayment,clearCart} = useCartContext();

  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  let remaining = parseFloat(Total) - parseFloat(input);
  


  
  const handleClick = (value) => setInput((prevInput) => prevInput + value);
  const handleClear = () => setInput("");
  const handleDeleteOne = () => {
    setInput((prevInput) => {
      if (prevInput === "") return prevInput;
      return prevInput.slice(0, -1);
    });
  };


  const handleSaveAndNavigate = async (paymentType) => {

    if (input === "" || input === "0") {
      // Alert göster
      alert("Please enter a valid amount.");
      return; // İşlemi durdur
    }

    setPaymentType(paymentType); // Ödeme tipini dinamik olarak ayarla
    if (parseFloat(input) < parseFloat(Total)) {
      setOpenModal(true);
      return;
    }
    
    await saveReceivedMoney();
    setPartialPayment(false);
    setInput("");
    navigate('/price'); // Kullanıcıyı '/price' sayfasına yönlendir
  };
  
  const handlePayment = () => {
    saveReceivedMoney();
    setPartialPayment(true);
    navigate('/price');
    setInput("");
  };
  const handleClose=()=>{
      setOpenModal(false);
      clearCart();
  }
  
  const buttonStyle = {
    width: "100%",  // Butonun genişliği div'e tam sığacak şekilde
    height: "100%", // Butonun yüksekliği div'e tam sığacak şekilde
    borderRadius: "10px" , // borderRadius özelliği eklendi
    backgroundColor: '#0E3F57', 
    color:"white",
    fontWeight:"bold",
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', 
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#FFD700', // Farklı bir hover rengi belirleyebilirsiniz.
    } };  

    
  const flexcontainer ={
    display: 'flex', flexDirection: 'row', margin: 5, width: "100%", height: 60
  }


  return (
    <Grid container spacing={1} style={{ padding: 10 }}>
      <Grid item xs={8} >
        <Input
          fullWidth
          type="text"
          value={input}
          placeholder="0"
          readOnly
          style={{ fontSize: '2rem', textAlign: "right" }}
        />
      </Grid>
      <Grid item xs={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
    {/* Bu boş Grid item, aradaki boşluğu sağlar. */}
  </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="secondary" onClick={handleClear} sx={buttonStyle}><ClearIcon/></Button>
      </Grid>
    
      <div style={flexcontainer}>
            <div style={{ flexGrow: 1, margin: 5,borderRadius:"10px",height:"100%" }}>
                <Button color="primary" onClick={() => handleClick("00")} sx={buttonStyle}>00</Button>
            </div>
            <div style={{ flexGrow: 1,  margin: 5,borderRadius:"10px",height:"100%" }}>
                <Button color="primary" onClick={handleDeleteOne} sx={buttonStyle}>
                    <BackspaceIcon />
                </Button>
            </div>
            <div style={{ flexGrow: 2, margin: 5, display: 'flex', justifyContent: 'flex-end',borderRadius:"10px",height:"100%",width:80 }}>
                <Button variant="contained" onClick={openCampaignModalFn} color="success" sx={{ width: "100%", height: "100%" }}>Kampanya Listesi</Button>
            </div>
        </div>

        <div style={flexcontainer}>
      <div style={{ flexGrow: 1, margin: 5, borderRadius: "10px",height:"100%" }}>
        <Button color="primary" onClick={() => handleClick("7")} sx={buttonStyle}>
          7
        </Button>
      </div>
      <div style={{ flexGrow: 1,  margin: 5, borderRadius: "10px",height:"100%" }}>
        <Button color="primary" onClick={() => handleClick("8")} sx={buttonStyle}>
          8
        </Button>
      </div>
      <div style={{ flexGrow: 1,  margin: 5, borderRadius: "10px",height:"100%" }}>
        <Button color="primary" onClick={() => handleClick("9")} sx={buttonStyle}>
          9
        </Button>
      </div>
      <div style={{ flexGrow: 10, margin: 5, borderRadius: "10px", justifyContent: 'flex-end',height:"100%",width:80  }}>
        <Button color="primary" onClick={handleClear} sx={buttonStyle}>
          Miktar
        </Button>
      </div>
    </div> 

      <div style={flexcontainer}>
<div style={{ flexGrow: 1, margin:5,borderRadius: "10px",height:"100%"}}>  <Button color="primary" onClick={() => handleClick("4")} sx={buttonStyle}>4</Button></div>
<div style={{ flexGrow: 1, margin:5,borderRadius: "10px",height:"100%"}}> <Button color="primary" onClick={() => handleClick("5")} sx={buttonStyle}>5</Button></div>
<div style={{ flexGrow: 1, margin:5,borderRadius: "10px",height:"100%"}}> <Button color="primary" onClick={() => handleClick("6")} sx={buttonStyle}>6</Button></div>
<div style={{ flexGrow: 10,  margin: 5, borderRadius: "10px", justifyContent: 'flex-end',flexDirection:"column" ,height:"130px",width:80 }}>
<Button variant="contained"  onClick={() => handleSaveAndNavigate('Nakit')}   color="success" style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
          Ödeme, Nakit
        </Button>
   </div>

      </div>     
     
     
      <div style={flexcontainer}>
<div style={{ flexGrow: 1, margin:5,borderRadius: "10px",height:"100%"}}>  <Button color="primary" onClick={() => handleClick("1")} sx={buttonStyle}>1</Button></div>
<div style={{ flexGrow: 1, margin:5,borderRadius: "10px",height:"100%"}}> <Button color="primary" onClick={() => handleClick("2")} sx={buttonStyle}>2</Button></div>
<div style={{ flexGrow: 1,margin:5,borderRadius: "10px",height:"100%"}}> <Button color="primary" onClick={() => handleClick("3")} sx={buttonStyle}>3</Button></div>
<div style={{ flexGrow: 10,  margin: 5, borderRadius: "10px", justifyContent: 'flex-end',flexDirection:"column" ,height:"100%",width:80 }}>

      </div>



      </div>     
   
  <div style={flexcontainer}>
            <div style={{ flexGrow: 1,  margin: 5,borderRadius:"10px",height:"100%" }}> <Button color="primary" onClick={() => handleClick("0")} sx={buttonStyle}>0</Button>
            </div>
            <div style={{ flexGrow: 1,  margin: 5,borderRadius:"10px",height:"100%" }}>
            <Button color="primary" onClick={() => handleClick(".")} sx={buttonStyle}>.</Button>
            </div>
            <div style={{ flexGrow: 2,  margin: 5, display: 'flex', justifyContent: 'flex-end',borderRadius:"10px",height:"100%",width:80 }}>
            <Button variant="contained" onClick={() => handleSaveAndNavigate('Kart')} color="error" style={{ width: "100%", height: "100%"}}>
          Kredi Kartı
        </Button> </div>
</div>

  {/* Yetersiz bakiye uyarısı için modal */}
  <PaymentModal open={openModal} handleClose={handleClose}remaining={remaining} Total={Total} handlePayment={handlePayment} clearCart={clearCart}/>

      
    </Grid>
  );
};

export default TransactionPanel;

