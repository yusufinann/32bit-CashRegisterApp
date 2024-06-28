import { useState, useCallback, useEffect } from "react";
import { calculateTotalPrice } from "../utils/CartHelpers";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const addToCart = useCallback((product, activeCampaign) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.product_id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        updatedCart[existingItemIndex].campaignApplied = activeCampaign || updatedCart[existingItemIndex].campaignApplied;
        updatedCart[existingItemIndex].totalPrice = calculateTotalPrice(updatedCart[existingItemIndex]);
        return updatedCart;
      } else {
        const newItem = {
          product: {
            id: product.product_id,
            name: product.product_name,
            price: product.price,
            image: product.image_url,
            barcode: product.barcode,
            campaign_id: product.campaign_id,
            vat_rate: product.vat_rate,
          },
          quantity: 1,
          campaignApplied: activeCampaign || null,
          totalPrice: 0,
        };

        newItem.totalPrice = calculateTotalPrice(newItem);
        return [...prevCart, newItem];
      }
    });
  }, []);

  useEffect(() => {
    const newSubTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    setSubTotal(newSubTotal);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const calculateCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + calculateTotalPrice(item), 0);
  }, [cart]);

  const handleCampaignSelect = useCallback((campaignType) => {
    setActiveCampaign(campaignType);
  }, []);
  const handleAddToCart = (product,activeCampaign) => {
    //Card veya Button click olunca addtocart çalışcak

    addToCart(product,activeCampaign);
  };

  return {
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
    setCheckedProducts,
    handleAddToCart
  };
};

export default useCart;
