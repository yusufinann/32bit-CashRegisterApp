import React, { useState } from "react";
import { Button, Input, Grid } from "@mui/material";
//import * as math from "mathjs";
import "./styles.css";

const TransactionPanel = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput((prevInput) => prevInput + value);

  const handleClear = () => setInput("");

 /* const handleCalculate = () => {
    try {
      setInput(math.evaluate(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };*/

  const buttonStyle = {
    width: "60px",
    height: "60px",
    margin: 5,
  };

  return (
    <Grid container>
      <Grid item xs={8} style={{ marginTop: "10px" }}>
        <Input
          type="text"
          value={input}
          placeholder="0"
          readOnly
          style={{ textAlign: "right" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button color="secondary" onClick={handleClear} style={buttonStyle}>
          C
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="primary"
          onClick={() => handleClick("7")}
          style={buttonStyle}
        >
          7
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick("8")}
          style={buttonStyle}
        >
          8
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick("9")}
          style={buttonStyle}
        >
          9
        </Button>
        <Button
          color="secondary"
          onClick={() => handleClick("/")}
          style={{ ...buttonStyle, padding: 7 }}
        >
          /
        </Button>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          onClick={() => handleClick("4")}
          style={buttonStyle}
        >
          4
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick("5")}
          style={buttonStyle}
        >
          5
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick("6")}
          style={buttonStyle}
        >
          6
        </Button>
        <Button
          color="success"
          onClick={() => handleClick("*")}
          style={buttonStyle}
        >
          *
        </Button>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          onClick={() => handleClick("1")}
          style={buttonStyle}
        >
          1
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick("2")}
          style={buttonStyle}
        >
          2
        </Button>
        <Button 
      variant="contained"
      color="error"
      style={{
        width: "120px",
        height: "60px",
        margin: 5,
      }}
    >
      Kredi Kartı
    </Button>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          onClick={() => handleClick("0")}
          style={buttonStyle}
        >
          0
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick(".")}
          style={buttonStyle}
        >
          .
        </Button>
        <Button 
        variant="contained" color="success"
   style={{width: "120px",
    height: "60px",
    margin: 5, }}>Ödeme,Nakit</Button>
 
      </Grid>
    </Grid>
  );
};

export default TransactionPanel;
