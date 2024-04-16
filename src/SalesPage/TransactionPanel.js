import React from "react";
import { Button, Input, Grid } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearIcon from '@mui/icons-material/Clear';
import { useGlobalContext } from "../contexts/GlobalContext";

const TransactionPanel = () => {

  const { input, handleClick, handleClear, handleDeleteOne } = useGlobalContext();


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
                <Button variant="contained" color="success" sx={{ width: "100%", height: "100%" }}>Kampanya Listesi</Button>
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
<Button variant="contained" color="success" style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
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
            <Button variant="contained" color="error" style={{ width: "100%", height: "100%"}}>
          Kredi Kartı
        </Button> </div>
</div>
      
    </Grid>
  );
};

export default TransactionPanel;

