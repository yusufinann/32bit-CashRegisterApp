import { useState, useCallback } from "react";
import { generateUniqueId } from "../utils/CartHelpers";

const useReceipt = (cart, subTotal, calculateCartTotal) => {
  const [receipts, setReceipts] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [partialPayment, setPartialPayment] = useState(false);
  const [receivedMoney, setReceivedMoney] = useState(null);
  const [input, setInput] = useState("");

  const saveReceivedMoney = useCallback(() => {
    setReceivedMoney(input);
  }, [input]);

  const saveReceipt = useCallback(async () => {
    const totalCost = cart.reduce((total, item) => total + item.totalPrice, 0);
    let change = null;

    if (receivedMoney !== null) {
      change = (receivedMoney - totalCost).toFixed(2);
    }

    const receipt = {
      id: generateUniqueId(),
      timestamp: `${new Date().toLocaleDateString("tr-TR")} ${new Date().toLocaleTimeString("tr-TR", {
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
      subTotal: subTotal.toFixed(2),
      total: totalCost.toFixed(2),
      receivedMoney: receivedMoney,
      changeGiven: change,
      paymentType: partialPayment ? "Card&Cash" : paymentType,
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
        setReceipts([...receipts, savedReceipt]);
      } else {
        throw new Error("Fiş kaydedilemedi");
      }
    } catch (error) {
      console.error("Fiş kaydedilirken hata oluştu:", error);
    }
  }, [cart, receivedMoney, subTotal, partialPayment, paymentType, receipts]);

  return {
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
    changeGiven: (receivedMoney - calculateCartTotal()).toFixed(2),
    Total: calculateCartTotal().toFixed(2),
  };
};

export default useReceipt;
