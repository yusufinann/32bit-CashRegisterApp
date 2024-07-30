import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartContext } from "../contexts/CartContext";
import { calculateDiscountedTotal, isDiscounted } from "../utils/CartUtil";

export const useCartItem = (item, setRemoveAlertOpen, setRemovedProduct) => {
  const { setCart, calculateTotalPrice, setPersistingCampaignItems } = useCartContext();
  const { t } = useTranslation();
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");

  const { normalTotal, discountedTotal } = calculateDiscountedTotal(item, calculateTotalPrice);
  const itemIsDiscounted = isDiscounted(normalTotal, discountedTotal);

  const handlePopperOpen = (event, content) => {
    setAnchorEl(event.currentTarget);
    setTooltipContent(content);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const increaseQuantity = (product) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.product.id === product.id
          ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: calculateTotalPrice({ ...cartItem, quantity: cartItem.quantity + 1 }) }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.product.id === product.id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1, totalPrice: calculateTotalPrice({ ...item, quantity: item.quantity - 1 }) }
              : null
            : item
        )
        .filter(Boolean);
      
      if (prevCart.find(cartItem => cartItem.product.id === product.id).quantity === 1) {
        setRemoveAlertOpen(true);
        setRemovedProduct(product);
      }
      
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find(item => item.product.id === product.id);
      if (removedItem && removedItem.campaignApplied) {
        setPersistingCampaignItems(prev => ({
          ...prev,
          [product.id]: {
            product_id: product.id,
            productName: product.name,
            image: product.image,
            campaignApplied: removedItem.campaignApplied,
            quantity: removedItem.quantity,
            barcode: product.barcode,
            totalPrice: (removedItem.totalPrice).toFixed(2),
            price: product.price,
            vat_rate: product.vat_rate
          }
        }));
      }
      return prevCart.filter((cartItem) => cartItem.product.id !== product.id);
    });
    setRemovedProduct(product);
    setRemoveAlertOpen(true);
  };

  const handleCampaignIconClick = (productId) => {
    setCampaignModalOpen(true);
  };

  const handleCloseCampaignModal = () => {
    setCampaignModalOpen(false);
  };

  return {
    t,
    campaignModalOpen,
    anchorEl,
    open: Boolean(anchorEl),
    tooltipContent,
    isDiscounted: itemIsDiscounted,
    discountedTotal,
    handlePopperOpen,
    handlePopperClose,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveFromCart,
    handleCampaignIconClick,
    handleCloseCampaignModal,
  };
};