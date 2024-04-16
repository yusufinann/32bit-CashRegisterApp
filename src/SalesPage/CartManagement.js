import React from "react";
import { Grid } from "@mui/material";
import CartList from "./CartList";
import TotalAmount from "./TotalAmount";
import { useGlobalContext } from "../contexts/GlobalContext";

function CartManagement() {
  const { totalAmount } = useGlobalContext();
  return (
    <div style={{ margin: 20 }}>
      <Grid
        item
        xs={12} // Full width on small screens
        sm={12} // Four columns on medium screens and larger
        style={{
          height: "70vh", // Set to 80% of the viewport height
          overflow: "auto",
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: "100%", // Full width
        }}
      >
        <CartList />
      </Grid>

      <TotalAmount totalAmount={totalAmount} />
    </div>
  );
}

export default CartManagement;
