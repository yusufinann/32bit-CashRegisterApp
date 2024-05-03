import React, { useState } from "react";
import { Button, Input, Grid } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearIcon from '@mui/icons-material/Clear';
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from 'react-router-dom';
import PaymentModal from "./PaymentModal";

const TransactionPanel = () => {

  const navigate = useNavigate();

  const { input, handleClick, handleClear, handleDeleteOne,openCampaignModalFn, setPaymentType,saveReceivedMoney,Total,setPartialPayment,setInput  } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);

  const handleSaveAndNavigate = async (paymentType) => {
    setPaymentType(paymentType); // Ödeme tipini dinamik olarak ayarla
  
    if (input < Total) { // Küçük veya eşitse uyarı göster
      setShowModal(true); // Yetersiz bakiye uyarısı için modalı göster
      return; // Fonksiyondan çık
    }
  
    // Diğer durumda işlem yap ve sayfayı yönlendir
    setShowModal(false);
    await saveReceivedMoney(); // saveReceivedMoney fonksiyonunu çağır
    setPartialPayment(false);
    setInput("");
    navigate('/price'); // Kullanıcıyı '/price' sayfasına yönlendir
  };
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
<PaymentModal isOpen={showModal} handleClose={() => setShowModal(false)} />

      
    </Grid>
  );
};

export default TransactionPanel;

