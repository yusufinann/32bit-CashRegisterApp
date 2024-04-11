import React from "react";
import { Button, Container } from "@mui/material";
import "./styles.css";
import TransactionPanel from "./TransactionPanel";

const TransactionButtons = () => {
  return (
    <Container>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <Button variant="contained" color="primary">
          isimden Ara
        </Button>
        <Button variant="contained" color="success">
          Satıcı
        </Button>
        <Button variant="contained" color="error">
          A101 Hadi
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <Button variant="contained" color="primary">
          Taksitli
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 20,
        }}
      >
        <Button variant="contained" color="primary">
          Belge İptal
        </Button>
        <Button variant="contained" color="success">
          Satır İptal
        </Button>
        <Button variant="contained" color="error">
          Taksitli
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <TransactionPanel />
      </div>
    </Container>
  );
};

export default TransactionButtons;
