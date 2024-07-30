import React from "react";
import { IconButton, Popper, Box, Fade } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CampaignIcon from "@mui/icons-material/Campaign";
import CampaignModal from "./CampaignModal";
import { useCartItem } from "../../hooks/useCartItem";
import { CAMPAIGN_TYPES } from "./Constants";
import "./Cart.css";

const CartItem = ({ item, setRemoveAlertOpen, setRemovedProduct }) => {
  const {
    t,
    campaignModalOpen,
    anchorEl,
    open,
    tooltipContent,
    isDiscounted,
    discountedTotal,
    handlePopperOpen,
    handlePopperClose,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveFromCart,
    handleCampaignIconClick,
    handleCloseCampaignModal,
  } = useCartItem(item, setRemoveAlertOpen, setRemovedProduct);

  return (
    <div className="cart-item" style={{ '--background-color': isDiscounted ? '#ffebee' : '#FFD467' }}>
      <div className="cart-item-title">{item.product.name}</div>
      <div className="cart-item-info">
        {t('Barcode')}: {item.product.barcode} | {t('Tax')}: %{item.product.vat_rate}
      </div>
      <Box className="cart-item-actions">
        <IconButton
          size="small"
          color="primary"
          onClick={() => decreaseQuantity(item.product)}
          onMouseEnter={(e) => handlePopperOpen(e, t("Decrease"))}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-decrease"
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <div variant="body1" className="cart-item-quantity">{item.quantity}</div>
        <IconButton
          size="small"
          color="primary"
          onClick={() => increaseQuantity(item.product)}
          onMouseEnter={(e) => handlePopperOpen(e, t("Increase"))}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-increase"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        
        {isDiscounted && (
          <span className="cart-item-discount">
            {CAMPAIGN_TYPES[item.campaignApplied] ? t(CAMPAIGN_TYPES[item.campaignApplied]) : ''}
          </span>
        )}

        <div className="cart-item-price">{discountedTotal.toFixed(2)} TL</div>
        <IconButton
          onClick={() => handleCampaignIconClick(item.product.id)}
          onMouseEnter={(e) => handlePopperOpen(e, t("Campaign Options"))}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-campaign"
        >
          <CampaignIcon sx={{ fontSize: '2rem' }} className={item.campaignApplied ? "campaign-icon-active" : "campaign-icon"} />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleRemoveFromCart(item.product)}
          onMouseEnter={(e) => handlePopperOpen(e, t("Remove from Cart"))}
          onMouseLeave={handlePopperClose}
          className="cart-item-button cart-item-button-remove"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
      <CampaignModal campaignModalOpen={campaignModalOpen} handleCloseCampaignModal={handleCloseCampaignModal} productId={item.product.id} t={t} />
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <div className="popper-paper">
              <div className="popper-text">{tooltipContent}</div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default CartItem;