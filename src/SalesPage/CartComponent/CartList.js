import React, { useState } from "react";
import { Box, Snackbar, Alert, useTheme, useMediaQuery } from "@mui/material";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import "./Cart.css";

const CartList = ({t,cart}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [removeAlertOpen, setRemoveAlertOpen] = useState(false);
  const [removedProduct, setRemovedProduct] = useState(null);

  const handleCloseRemoveAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRemoveAlertOpen(false);
    setRemovedProduct(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {cart.length > 0 ? (
        <CartSummary
          cart={cart}
          isSmallScreen={isSmallScreen}
          setRemoveAlertOpen={setRemoveAlertOpen}
          setRemovedProduct={setRemovedProduct}
        />
      ) : (
        <EmptyCart t={t} />
      )}
      <Snackbar
        open={removeAlertOpen}
        autoHideDuration={3000}
        onClose={handleCloseRemoveAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseRemoveAlert}
          severity="info"
          sx={{ width: "300px", fontSize: "1.2rem" }}
        >
          {removedProduct ? `${removedProduct.name} ${t('removed from cart')}` : ""}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartList;
