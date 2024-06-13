import React, { useState } from "react";
import { IconButton, Popper, Box, Fade } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useCartContext } from "../../contexts/CartContext";
import "../styles.css";
import "./Cart.css";
import CampaignModal from "./CampaignModal";

const CartItem = ({ item, isSmallScreen, setRemoveAlertOpen, setRemovedProduct }) => {
  const { setCart, calculateTotalPrice } = useCartContext();
  const [selectedProductForCampaign, setSelectedProductForCampaign] = useState(null);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");

  const handlePopperOpen = (event, content) => {
    setAnchorEl(event.currentTarget);
    setTooltipContent(content);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.product.id !== product.id));
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
    removeFromCart(product);
    setRemovedProduct(product);
    setRemoveAlertOpen(true);
  };

  const handleCampaignIconClick = (productId) => {
    setSelectedProductForCampaign((prevSelected) => (prevSelected === productId ? null : productId));
    setCampaignModalOpen(true); // Modal açıldığında
  };

  const handleCloseCampaignModal = () => {
    setCampaignModalOpen(false);
    setSelectedProductForCampaign(null); // Modal kapatıldığında
  };

  const normalTotal = item.quantity * item.product.price;
  const discountedTotal = calculateTotalPrice(item);
  const isDiscounted = normalTotal.toFixed(2) !== discountedTotal.toFixed(2);

  return (
    <div className="cart-item" style={{ '--background-color': isDiscounted ? '#ffebee' : '#FFD467' }}>
      <div  gutterBottom className="cart-item-title">
        {item.product.name}
      </div>
      <div className="cart-item-info">
        Barkod: {item.product.barcode} | KDV: %{item.product.vat_rate}
      </div>
      <Box className="cart-item-actions">
        <IconButton
          size="small"
          color="primary"
          onClick={() => decreaseQuantity(item.product)}
          onMouseEnter={(e) => handlePopperOpen(e, "Azalt")}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-decrease"
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <div variant="body1" className="cart-item-quantity">
          {item.quantity}
        </div>
        <IconButton
          size="small"
          color="primary"
          onClick={() => increaseQuantity(item.product)}
          onMouseEnter={(e) => handlePopperOpen(e, "Arttır")}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-increase"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        
        {isDiscounted && (
          <span variant="body2" className="cart-item-discount">
            {item.campaignApplied}
          </span>
        )}
        <div  className="cart-item-price">
          {discountedTotal.toFixed(2)} TL
        </div>
        <IconButton
          onClick={() => handleCampaignIconClick(item.product.id)}
          onMouseEnter={(e) => handlePopperOpen(e, "Kampanya Seçenekleri")}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-campaign"
        >
          <CampaignIcon  sx={{ fontSize: '2rem' }} className={item.campaignApplied ? " campaign-icon-active" : "campaign-icon"} />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleRemoveFromCart(item.product)}
          onMouseEnter={(e) => handlePopperOpen(e, "Sepetten Çıkar")}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-remove"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      <CampaignModal campaignModalOpen={campaignModalOpen} handleCloseCampaignModal={handleCloseCampaignModal} productId={item.product.id} />
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="popper-paper">
              <div className="popper-text">
                {tooltipContent}
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default CartItem;