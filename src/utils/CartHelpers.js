export const calculateTotalPrice = (item) => {
  let totalCost = item.quantity * item.product.price;

  if (item.campaignApplied) {
    switch (item.campaignApplied) {
      case "3al2":
        const groupsOfThree = Math.floor(item.quantity / 3);
        const remainder = item.quantity % 3;
        totalCost = groupsOfThree * 2 * item.product.price + remainder * item.product.price;
        break;
      case "etiketinYarisi":
        totalCost = item.product.price * 0.5 * item.quantity;
        break;
      case "yuzde10":
        totalCost = item.product.price * 0.9 * item.quantity;
        break;
      default:
        break;
    }
  }

  return totalCost;
};

export const generateUniqueId = () => {
  const saleId = Math.floor(Math.random() * 10000);
  return `${saleId}`;
};