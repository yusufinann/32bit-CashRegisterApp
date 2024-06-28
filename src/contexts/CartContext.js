import React, { createContext, useContext } from "react";
import useCart from "../hooks/useCart";
import useReceipt from "../hooks/useReceipt";
import { calculateTotalPrice, generateUniqueId } from "../utils/CartHelpers";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const {
    cart,
    setCart,
    subTotal,
    addToCart,
    clearCart,
    calculateCartTotal,
    activeCampaign,
    setActiveCampaign,
    handleCampaignSelect,
    checkedProducts,
    setCheckedProducts,handleAddToCart
  } = useCart();

  const {
    receipts,
    setReceipts,
    paymentType,
    setPaymentType,
    partialPayment,
    setPartialPayment,
    receivedMoney,
    setReceivedMoney,
    saveReceivedMoney,
    input,
    setInput,
    saveReceipt,
    changeGiven,
    Total,
  } = useReceipt(cart, subTotal, calculateCartTotal);

  const contextValue = {
    cart,
    setCart,
    subTotal,
    addToCart,
    clearCart,
    calculateCartTotal,
    handleCampaignSelect,
    activeCampaign,
    setActiveCampaign,
    checkedProducts,
    setCheckedProducts,
    receipts,
    setReceipts,
    paymentType,
    setPaymentType,
    partialPayment,
    setPartialPayment,
    receivedMoney,
    setReceivedMoney,
    saveReceivedMoney,
    input,
    setInput,
    saveReceipt,
    changeGiven,
    Total,handleAddToCart, calculateTotalPrice, 
    saleId:generateUniqueId()
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCartContext };
