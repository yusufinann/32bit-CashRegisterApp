export const calculateTotalSalesQuantity = (receipts) => {
    return receipts.reduce(
      (acc, receipt) =>
        acc + receipt.items.reduce((acc, item) => acc + item.quantity, 0),
      0
    );
  };
  
  export const calculateSalesAmount = (receipts) => {
    let totalSalesAmount = 0;
    receipts.forEach((receipt) => {
      const total = parseFloat(receipt.total);
      totalSalesAmount += total;
    });
    return totalSalesAmount.toFixed(2);
  };
  
  export const calculatePaymentTypes = (receipts) => {
    return receipts.reduce((types, receipt) => {
      const paymentType = receipt.paymentType;
      types[paymentType] = (types[paymentType] || 0) + 1;
      return types;
    }, {});
  };
  
  export const calculateProductsSoldQuantity = (receipts) => {
    return receipts.reduce((products, receipt) => {
      receipt.items.forEach((item) => {
        const { productName, quantity } = item;
        products[productName] = (products[productName] || 0) + quantity;
      });
      return products;
    }, {});
  };
  
  export const findMostSoldProducts = (productsSoldQuantity) => {
    let mostSoldProducts = [];
    let maxQuantity = 0;
    for (const productName in productsSoldQuantity) {
      const quantity = productsSoldQuantity[productName];
      if (quantity > maxQuantity) {
        mostSoldProducts = [{ name: productName, quantity }];
        maxQuantity = quantity;
      } else if (quantity === maxQuantity) {
        mostSoldProducts.push({ name: productName, quantity });
      }
    }
    return mostSoldProducts;
  };
  
  export const findLeastSoldProducts = (productsSoldQuantity) => {
    let leastSoldProducts = [];
    let minQuantity = Infinity;
    for (const productName in productsSoldQuantity) {
      const quantity = productsSoldQuantity[productName];
      if (quantity < minQuantity) {
        leastSoldProducts = [{ name: productName, quantity }];
        minQuantity = quantity;
      } else if (quantity === minQuantity) {
        leastSoldProducts.push({ name: productName, quantity });
      }
    }
    return leastSoldProducts;
  };
  
  export const findMostProfitableProducts = (receipts) => {
    const productsRevenue = {};
    receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        const { productName, barcode, totalPrice } = item;
        if (!productsRevenue[productName]) {
          productsRevenue[productName] = {
            revenue: 0,
            barcode: barcode,
            price: totalPrice,
          };
        }
        productsRevenue[productName].revenue += totalPrice;
      });
    });
    const mostProfitableProducts = [];
    let maxRevenue = 0;
    for (const productName in productsRevenue) {
      const revenue = productsRevenue[productName].revenue;
      if (revenue > maxRevenue) {
        mostProfitableProducts.length = 0;
        maxRevenue = revenue;
      }
      if (revenue === maxRevenue) {
        mostProfitableProducts.push({
          name: productName,
          barcode: productsRevenue[productName].barcode,
          price: productsRevenue[productName].price,
        });
      }
    }
    return mostProfitableProducts;
  };
  
  export const findLeastProfitableProducts = (receipts) => {
    const productsRevenue = {};
    receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        const { productName, barcode, totalPrice } = item;
        if (!productsRevenue[productName]) {
          productsRevenue[productName] = {
            revenue: 0,
            barcode: barcode,
            price: totalPrice,
          };
        }
        productsRevenue[productName].revenue += totalPrice;
      });
    });
    let leastProfitableProducts = [];
    let minRevenue = Infinity;
    for (const productName in productsRevenue) {
      const revenue = productsRevenue[productName].revenue;
      if (revenue < minRevenue) {
        leastProfitableProducts = [
          {
            name: productName,
            barcode: productsRevenue[productName].barcode,
            price: productsRevenue[productName].price,
          },
        ];
        minRevenue = revenue;
      } else if (revenue === minRevenue) {
        leastProfitableProducts.push({
          name: productName,
          barcode: productsRevenue[productName].barcode,
          price: productsRevenue[productName].price,
        });
      }
    }
    return leastProfitableProducts;
  };
  
  export const calculateTotalVAT = (receipts) => {
    let totalVAT = 0;
    receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        const { unitPrice, vat_rate, quantity } = item;
        const vatAmountPerItem = (unitPrice * vat_rate) / 100;
        const totalVATPerItem = vatAmountPerItem * quantity;
        totalVAT += totalVATPerItem;
      });
    });
    return totalVAT.toFixed(2);
  };
  
  export const findMostUsedPaymentMethod = (receipts) => {
    let paymentMethods = {};
    receipts.forEach((receipt) => {
      const paymentMethod = receipt.paymentType;
      paymentMethods[paymentMethod] = (paymentMethods[paymentMethod] || 0) + 1;
    });
    let mostUsedMethod = null;
    let maxCount = 0;
    for (const method in paymentMethods) {
      const count = paymentMethods[method];
      if (count > maxCount) {
        mostUsedMethod = method;
        maxCount = count;
      }
    }
    return mostUsedMethod;
  };
  
  export const calculateSubTotal = (receipts) => {
    let totalSubTotal = 0;
    receipts.forEach((receipt) => {
      const subTotal = parseFloat(receipt.subTotal);
      totalSubTotal += subTotal;
    });
    return totalSubTotal.toFixed(2);
  };
  
  export const calculateTotalDiscount = (totalSubTotal, totalSalesAmount) => {
    return (totalSubTotal - totalSalesAmount).toFixed(2);
  };