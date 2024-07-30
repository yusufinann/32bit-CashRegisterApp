export const calculateDiscountedTotal = (item, calculateTotalPrice) => {
    const normalTotal = item.quantity * item.product.price;
    const discountedTotal = calculateTotalPrice(item);
    return { normalTotal, discountedTotal };
  };
  
  export const isDiscounted = (normalTotal, discountedTotal) => {
    return normalTotal.toFixed(2) !== discountedTotal.toFixed(2);
  };