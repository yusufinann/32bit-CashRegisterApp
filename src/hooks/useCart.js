import { useState, useCallback, useEffect } from "react";
import { calculateTotalPrice } from "../utils/CartHelpers";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [email, setEmail] = useState(""); 
  const [persistingCampaignItems, setPersistingCampaignItems] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const addToCart = useCallback((product, activeCampaign) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.product_id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        // Eğer kaldırılmış bir ürünün kampanyası varsa, onu kullan
        updatedCart[existingItemIndex].campaignApplied = activeCampaign || 
          (persistingCampaignItems[product.product_id] && persistingCampaignItems[product.product_id].campaignApplied) || 
          updatedCart[existingItemIndex].campaignApplied;
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
          campaignApplied: activeCampaign || 
            (persistingCampaignItems[product.product_id] && persistingCampaignItems[product.product_id].campaignApplied) || 
            null,
          totalPrice: 0,
        };

        newItem.totalPrice = calculateTotalPrice(newItem);
        return [...prevCart, newItem];
      }
    });

    // Ürün eklendiğinde, kaldırılmış ürünler listesinden bu ürünü çıkar
    setPersistingCampaignItems(prev => {
      const { [product.productid]:_, ...rest } = prev;
      return rest;
    });
  }, [persistingCampaignItems]);

  useEffect(() => {
    const newSubTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    setSubTotal(newSubTotal);
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart((prevCart) => {
      // Mevcut kampanya bilgilerini sakla
      const campaignInfo = {};
      prevCart.forEach(item => {
        if (item.campaignApplied) {
          campaignInfo[item.product.id] = {
            product_id:item.product.id,
            productName: item.product.name,
            quantity:item.quantity,
            image:item.product.image,
            campaignApplied: item.campaignApplied,
            barcode: item.product.barcode ,
            totalPrice:(item.totalPrice).toFixed(2),
            price:item.product.price,
            vat_rate:item.product.vat_rate
          };
        }
      });

      // Kampanya bilgilerini removedItemsCampaigns'e ekle
      setPersistingCampaignItems(prev => ({
        ...prev,
        ...campaignInfo
      }));

      // Sepeti temizle
      return [];
    });
  }, [setPersistingCampaignItems]);

  const calculateCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + calculateTotalPrice(item), 0);
  }, [cart]);

  const handleCampaignSelect = useCallback((campaignType) => {
    setActiveCampaign(campaignType);
  }, []);

  const handleAddToCart = (product, activeCampaign) => {
    addToCart(product, activeCampaign);
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
    handleAddToCart,
    email,
    setEmail,
    setPersistingCampaignItems,persistingCampaignItems,selectedCampaign, setSelectedCampaign
  };
};

export default useCart;