import React from "react";
import CartItem from "./CartItem";

const CartSummary = ({ cart, isSmallScreen, setRemoveAlertOpen, setRemovedProduct }) => {
  return (
    <>
      {cart.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          isSmallScreen={isSmallScreen}
          setRemoveAlertOpen={setRemoveAlertOpen}
          setRemovedProduct={setRemovedProduct}
        />
      ))}
    </>
  );
};

export default CartSummary;
