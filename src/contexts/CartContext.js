import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [receipts, setReceipts] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [partialPayment, setPartialPayment] = useState(false); //PaymentModal - Receipt
  const [isVisible, setIsVisible] = useState(false);
  
 

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.product_id
      );

      if (existingItem) {
        // Update quantity
        let newQuantity = existingItem.quantity + 1;
        let newPrice = existingItem.product.price;

        // Implement campaign C001: 3 for 2 offer
        if (product.campaign_id === "C001") {
          const groupsOfThree = Math.floor(newQuantity / 3);
          const remainder = newQuantity % 3;
          newPrice =
            groupsOfThree * 2 * existingItem.product.price +
            remainder * existingItem.product.price;
        }

        // Implement campaign C002: 50% discount
        else if (product.campaign_id === "C002") {
          newPrice = existingItem.product.price * 0.5 * newQuantity;
        }

        // Implement campaign C003: 10% discount
        else if (product.campaign_id === "C003") {
          newPrice = existingItem.product.price * 0.9 * newQuantity;
        }

        return prevCart.map((item) =>
          item.product.id === product.product_id
            ? { ...item, quantity: newQuantity, totalPrice: newPrice }
            : item
        );
      } else {
        // Adding a new item to the cart
        let initialPrice = product.price;

        // Check if the product addition should apply C001 offer
        if (product.campaign_id === "C001" && product.quantity === 3) {
          initialPrice = product.price * 2; // Pay for 2 even though it's 3
        }

        // Apply C002: 50% discount on first addition
        else if (product.campaign_id === "C002") {
          initialPrice = product.price * 0.5;
        }

        // Apply C003: 10% discount on first addition
        else if (product.campaign_id === "C003") {
          initialPrice = product.price * 0.9;
        }

        return [
          ...prevCart,
          {
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
            totalPrice: initialPrice,
          },
        ];
      }
    });
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
 

  const calculateTotalPrice = (item) => {
    let totalCost = item.quantity * item.product.price;

    // Apply different campaigns based on the campaign ID
    switch (item.product.campaign_id) {
      case "C001":
        // Campaign C001: "Buy 3, pay for 2"
        const numberOfFullDiscounts = Math.floor(item.quantity / 3);
        const numberOfPaidItems = item.quantity - numberOfFullDiscounts;
        totalCost = numberOfPaidItems * item.product.price;
        break;
      case "C002":
        // Campaign C002: 50% discount
        totalCost = item.quantity * item.product.price * 0.5;
        break;
      case "C003":
        // Campaign C003: 10% discount
        totalCost = item.quantity * item.product.price * 0.9;
        break;
      default:
        // No campaign, regular price
        totalCost = item.quantity * item.product.price;
        break;
    }

    return totalCost;
  };

  const handleAddToCart = (product) => {
    //Card veya Button click olunca addtocart çalışcak

    addToCart(product);
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

  const [changeGiven, setChangeGiven] = useState(null);
  const [receivedMoney, setReceivedMoney] = useState(null);
  const saveReceipt = async () => {
    const totalCost = cart.reduce((total, item) => total + item.totalPrice, 0);
    let change = null;

    // Alınan para girilmişse para üstünü hesapla
    if (receivedMoney !== null) {
      change = (receivedMoney - totalCost).toFixed(2);
      setChangeGiven(change); // Hesaplanan para üstünü state'e güncelle
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
    saveReceipt,isVisible
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, useCartContext };


