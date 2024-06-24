import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [partialPayment, setPartialPayment] = useState(false); //PaymentModal - Receipt
  const [activeCampaign, setActiveCampaign] = useState(null); // yeni state
  const [checkedProducts, setCheckedProducts] = useState([]); // yeni state
  
  const handleCampaignSelect = (campaignType) => {
    setActiveCampaign(campaignType);
  };
  const addToCart = (product, activeCampaign) => {
    setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
            (item) => item.product.id === product.product_id
        );

        if (existingItemIndex !== -1) {
            // If the product is already in the cart
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity += 1;
            updatedCart[existingItemIndex].campaignApplied = activeCampaign || updatedCart[existingItemIndex].campaignApplied;
            updatedCart[existingItemIndex].totalPrice = calculateTotalPrice(updatedCart[existingItemIndex], checkedProducts);
            console.log(updatedCart[existingItemIndex].totalPrice);
            return updatedCart;
        } else {
            // If the product is not in the cart
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

            newItem.totalPrice = calculateTotalPrice(newItem, checkedProducts);
            return [...prevCart, newItem];
        }
    });
};

 const calculateTotalPrice = (item, checkedProducts) => {
    let totalCost = item.quantity * item.product.price;

    console.log('Calculating total price for item:', item);

    if (item.campaignApplied) {
        if (item.campaignApplied === "3al2") {
            const groupsOfThree = Math.floor(item.quantity / 3);
            const remainder = item.quantity % 3;
            totalCost = groupsOfThree * 2 * item.product.price + remainder * item.product.price;
        } else if (item.campaignApplied === "etiketinYarisi") {
            totalCost = item.product.price * 0.5 * item.quantity;
        } else if (item.campaignApplied === "yuzde10") {
            totalCost = item.product.price * 0.9 * item.quantity;
        }
    }

    console.log('Total cost calculated:', totalCost);

    return totalCost;
  };

  useEffect(() => {
    // Calculate subtotal whenever the cart changes
    let newSubTotal = 0;
    cart.forEach((item) => {
      newSubTotal += item.product.price * item.quantity;
    });
    setSubTotal(newSubTotal);
  }, [cart]);

  const clearCart = () => { 
    setCart([]); // Clear the cart array
   
  };  

  const handleAddToCart = (product,activeCampaign) => {
    //Card veya Button click olunca addtocart çalışcak

    addToCart(product,activeCampaign);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };
  const Total = calculateCartTotal().toFixed(2);

  const generateUniqueId = () => {
    const randomNumber = Math.floor(Math.random() * 10000); // Rastgele bir sayı oluştur (örneğin, 0 ile 9999 arasında)
    return `${randomNumber}`; // Tarih damgası ve rastgele sayıyı birleştirerek benzersiz bir kimlik oluştur
  };

  let saleId = generateUniqueId();

  const [receivedMoney, setReceivedMoney] = useState(null);
  const saveReceipt = async () => {
    const totalCost = cart.reduce((total, item) => total + item.totalPrice, 0);
    let change = null;

    // Alınan para girilmişse para üstünü hesapla
    if (receivedMoney !== null) {
      change = (receivedMoney - totalCost).toFixed(2);
    }
    // Fiş verisi oluştur
    const receipt = {
      id: saleId,
      timestamp: `${new Date().toLocaleDateString(
        "tr-TR"
      )} ${new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.totalPrice,
        barcode: item.product.barcode,
        vat_rate: item.product.vat_rate,
      })),
      subTotal: subTotal.toFixed(2), // Ara toplam
      total: totalCost.toFixed(2),
      receivedMoney: receivedMoney, // Alınan para
      changeGiven: change, // Para üstü
      paymentType: paymentType, // Ödeme Türü
    };

    try {
      const response = await fetch("http://localhost:3000/receipts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receipt),
      });

      if (response.ok) {
        const savedReceipt = await response.json();
        setReceipts([...receipts, savedReceipt]); // Fişi kaydet
      } else {
        throw new Error("Fiş kaydedilemedi");
      }
    } catch (error) {
      console.error("Fiş kaydedilirken hata oluştu:", error);
    }
  };

  const [input, setInput] = useState("");
  const saveReceivedMoney = () => {
    setReceivedMoney(input); // input değerini receivedMoney'e kaydet
  };
  //const changeGiven = (receivedMoney - Total).toFixed(2);


  const contextValue = {
    cart,setCart,
    subTotal,
    addToCart,
    clearCart,
   calculateTotalPrice,
   calculateCartTotal,
    handleAddToCart,
    Total,
    paymentType,
    setPaymentType,
    saleId,
    receipts,
    receivedMoney,
    partialPayment,
    setPartialPayment,
    saveReceivedMoney,
    input,
    setInput,
    saveReceipt,activeCampaign,
    setActiveCampaign, checkedProducts,setCheckedProducts,handleCampaignSelect
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCartContext };


