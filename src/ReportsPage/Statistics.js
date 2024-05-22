import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useCartContext } from "../contexts/CartContext";

const Statistics = () => {
  const { receipts } = useCartContext();

  if (!receipts || receipts.length === 0) {
    return <div>Henüz hiç fiş bulunmamaktadır.</div>;
  }

  const totalSalesQuantity = receipts.reduce(
    (acc, receipt) =>
      acc + receipt.items.reduce((acc, item) => acc + item.quantity, 0),
    0
  );

  const calculateSalesAmount = (receipts) => {
    let totalSalesAmount = 0;

    receipts.forEach((receipt) => {
      // Eğer receipt.total bir string ise, önce onu parseFloat() ile sayıya dönüştürüyoruz
      const total = parseFloat(receipt.total);
      // Ardından toplam satış tutarını topluyoruz
      totalSalesAmount += total;
    });

    // Daha sonra, toplam satış tutarını 10.25 formatında göstermek için toFixed() kullanabiliriz
    return totalSalesAmount.toFixed(2);
  };

  const totalSalesAmount = calculateSalesAmount(receipts);
  const paymentTypes = receipts.reduce((types, receipt) => {
    const paymentType = receipt.paymentType;
    types[paymentType] = (types[paymentType] || 0) + 1;
    return types;
  }, {});

  const productsSoldQuantity = receipts.reduce((products, receipt) => {
    receipt.items.forEach((item) => {
      const { productName, quantity } = item;
      products[productName] = (products[productName] || 0) + quantity;
    });
    return products;
  }, {});

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

  const findMostProfitableProducts = (receipts) => {
    const productsRevenue = {};

    // Ürünlerin toplam gelirini hesapla
    receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        const { productName, barcode, totalPrice } = item; // Barkod ve fiyat bilgisini al
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

    // En yüksek geliri sağlayan ürünlerin bilgilerini bul
    const mostProfitableProducts = [];
    let maxRevenue = 0;

    for (const productName in productsRevenue) {
      const revenue = productsRevenue[productName].revenue;
      if (revenue > maxRevenue) {
        mostProfitableProducts.length = 0; // Mevcut en yüksek gelirli ürünleri temizle
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

  // Kullanımı:
  const mostProfitableProducts = findMostProfitableProducts(receipts);

  const findLeastProfitableProducts = (receipts) => {
    const productsRevenue = {};

    // Ürünlerin toplam gelirini hesapla
    receipts.forEach((receipt) => {
      receipt.items.forEach((item) => {
        const { productName, barcode, totalPrice } = item; // Barkod ve fiyat bilgisini al
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

    // En düşük gelir sağlayan ürünleri bul
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

  // Kullanımı:
  const leastProfitableProducts = findLeastProfitableProducts(receipts);

  const calculateTotalVAT = (receipts) => {
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

  // Kullanımı:
  const totalVAT = calculateTotalVAT(receipts);

  const findMostUsedPaymentMethod = (receipts) => {
    let paymentMethods = {};

    // Tüm fişlerdeki ödeme yöntemlerini say
    receipts.forEach((receipt) => {
      const paymentMethod = receipt.paymentType;
      paymentMethods[paymentMethod] = (paymentMethods[paymentMethod] || 0) + 1;
    });

    // En çok tercih edilen ödeme yöntemini bul
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

  const mostUsedPaymentMethod = findMostUsedPaymentMethod(receipts);

  const calculateSubTotal = (receipts) => {
    let totalSubTotal = 0;

    receipts.forEach((receipt) => {
      // Eğer receipt.subTotal bir string ise, önce onu parseFloat() ile sayıya dönüştürüyoruz
      const subTotal = parseFloat(receipt.subTotal);
      // Ardından toplam ara toplamı topluyoruz
      totalSubTotal += subTotal;
    });

    // Daha sonra, toplam ara toplamı 10.25 formatında göstermek için toFixed() kullanabiliriz
    return totalSubTotal.toFixed(2);
  };

  const totalSubTotal = calculateSubTotal(receipts);

  const calculateTotalDiscount = (totalSubTotal, totalSalesAmount) => {
    return totalSubTotal - totalSalesAmount;
  };
  const totalDiscount = calculateTotalDiscount(totalSubTotal, totalSalesAmount);

  return (
    <Box mt={2} sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h4" mb={2} sx={{ fontWeight: 'bold', color: '#333', fontSize: '24px' }}>
          Mağaza İstatistikleri
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
              <TableRow>
                <TableCell sx={{ color: "#333", fontWeight: "bold", fontSize: "16px" }}>İstatistik</TableCell>
                <TableCell sx={{ color: "#333", fontWeight: "bold", fontSize: "16px" }}>Değer</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Toplam Satılan ürün miktarı</TableCell>
                <TableCell>{totalSalesQuantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Mağaza Toplam Satış Tutarı</TableCell>
                <TableCell>{totalSalesAmount} TL</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Toplam Kdv Tutarı</TableCell>
                <TableCell>{totalVAT} TL</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Toplam satış tutarı en yüksek olan ürün</TableCell>
                <TableCell>
                  <List>
                    {mostProfitableProducts.map((product, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`Ürün Adı: ${product.name}`} />
                        <ListItemText primary={`Barkod: ${product.barcode}`} />
                        <ListItemText primary={`Satış Tutarı: ${product.price}`} />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Toplam satış tutarı en az olan ürünler</TableCell>
                <TableCell>
                  <List>
                    {leastProfitableProducts.map((product, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`Ürün Adı: ${product.name}`} />
                        <ListItemText primary={`Barkod: ${product.barcode}`} />
                        <ListItemText primary={`Satış Tutarı: ${product.price}`} />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Toplam Ara Toplam</TableCell>
                <TableCell>{totalSubTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Ödeme Türleri Dağılımı</TableCell>
                <TableCell>
                  <List>
                    {Object.entries(paymentTypes).map(([type, count]) => (
                      <ListItem key={type}>{`${type}: ${count}`}</ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">En çok tercih edilen ödeme Yöntemi</TableCell>
                <TableCell>{mostUsedPaymentMethod}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">En Çok Satan Ürünler (Trend Ürün)</TableCell>
                <TableCell>
                  <List>
                    {mostSoldProducts.length > 0 ? (
                      mostSoldProducts.map((product, index) => (
                        <ListItem key={index}>{`${product.name} (${product.quantity} adet)`}</ListItem>
                      ))
                    ) : (
                      <ListItem>Henüz satılan bir ürün yok.</ListItem>
                    )}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">En Az Satan Ürünler</TableCell>
                <TableCell>
                  <List>
                    {leastSoldProducts.length > 0 ? (
                      leastSoldProducts.map((product, index) => (
                        <ListItem key={index}>{`${product.name} (${product.quantity} adet)`}</ListItem>
                      ))
                    ) : (
                      <ListItem>Henüz satılan bir ürün yok.</ListItem>
                    )}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Ürünlerin Satış Dağılımı</TableCell>
                <TableCell>
                  <List>
                    {Object.entries(productsSoldQuantity).map(([productName, quantity], index) => (
                      <ListItem key={index}>{`${productName}: ${quantity} adet`}</ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Toplam Uygulanan İndirim</TableCell>
                <TableCell>{totalDiscount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Statistics;
