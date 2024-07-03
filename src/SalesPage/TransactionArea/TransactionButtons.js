import React, { useState } from "react";
import { Alert, Button, Container, Snackbar } from "@mui/material";
import "../styles.css";
import TransactionPanel from "./TransactionPanel";
import ModalSearch from "../ProductSearching/ModalSearch";
import { useCartContext } from "../../contexts/CartContext";
const TransactionButtons = ({ theme, t, setState,
  state,
  handleChange,
  showAllProducts,
  setShowAllProducts,
  handleShowProducts, }) => {
  // Modalın açık/kapalı durumunu kontrol eden state
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const handleOpenSearchModal = () => {
    handleShowProducts();
    setOpenSearchModal(true);
  };
  const handleCloseSearchModal = () => setOpenSearchModal(false);
  const { clearCart, paymentType, handleAddToCart, saveReceivedMoney, Total, input, setPaymentType, setInput, setPartialPayment} = useCartContext();

  const [alertOpen, setAlertOpen] = useState(false); // Snackbar state

  const handleClick = () => {
    clearCart();
    setAlertOpen(true); // Show Snackbar
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenSearchModal}
          >
            {t("Search From Name")}
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleClick}>
            {t("Cancel Order")}
          </Button>
          <Snackbar
            open={alertOpen}
            autoHideDuration={1000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Snackbar'ın konumu
            transitionDuration={{ enter: 500, exit: 500 }} // Snackbar'ın geçiş süresi
          >
            <Alert
              onClose={handleCloseAlert}
              severity="warning"
              sx={{ width: "300px", fontSize: "1.2rem" }}
            >
              {t("Cart is empty")}
            </Alert>
          </Snackbar>{" "}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <TransactionPanel theme={theme} t={t} paymentType={paymentType}  saveReceivedMoney={saveReceivedMoney} Total={Total} input={input} setPaymentType={setPaymentType}setInput={setInput} setPartialPayment={setPartialPayment} clearCart={clearCart} />
      </div>
      <ModalSearch
        theme={theme}
        open={openSearchModal}
        handleClose={handleCloseSearchModal}
        t={t}
        handleAddToCart={handleAddToCart}
        setState={setState}
        state={state}
        handleChange={handleChange}
        showAllProducts={showAllProducts}
        setShowAllProducts={setShowAllProducts}
        handleShowProducts={handleShowProducts}
      />
    </Container>
  );
};

export default TransactionButtons;
