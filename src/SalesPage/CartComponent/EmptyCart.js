import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const EmptyCart = () => {
  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h5">Your Cart is Empty</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
        onClick={() => alert("Redirect to shopping page")}
        sx={{ marginTop: "20px" }}
      >
        Go Shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;
