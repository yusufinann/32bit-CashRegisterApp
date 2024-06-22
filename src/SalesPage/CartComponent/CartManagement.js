import React from "react";
import { Grid } from "@mui/material";
import CartList from "./CartList";
import TotalAmount from "../TotalAmount";
import { useCartContext } from "../../contexts/CartContext";

function CartManagement({appTheme,t}) {
  const { subTotal } = useCartContext();

  return (
    <div style={{ margin: 20}}>
      <Grid
        item
        xs={12} // Full width on small screens
        sm={12} // Four columns on medium screens and larger
        style={{
          height: "75vh", // Set to 80% of the viewport height
          overflow: "auto",
          backgroundColor: appTheme==='dark' ? '#3C3C3C':"white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: "100%", // Full width
        }}
      >
        <CartList t={t}/>
      </Grid>

      <TotalAmount subTotal={subTotal} t={t} />
    </div>
  );
}

export default CartManagement;
