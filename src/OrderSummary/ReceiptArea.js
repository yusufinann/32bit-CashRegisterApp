import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import Receipt from './Receipt'; // Receipt bileşenini doğru şekilde import edin

const ReceiptArea = () => {
  // CartContext'i kullanarak cart dizisine erişim sağla
  const { cart, totalAmount } = useGlobalContext();

  // Cart dizisinden gelen verileri kullanarak HTML'i oluştur
  const productList = cart.flatMap((item) => [
    <tr key={`${item.product.barcode}-1`}>
      <td>{item.product.barcode}</td>
      <td>({item.quantity} × {item.product.price})</td>
      <td>{(item.quantity * item.product.price).toFixed(2)}</td> {/* Toplam fiyatı 2 ondalık hane ile göstermek için toFixed kullanıldı */}
    </tr>,
    <tr key={`${item.product.barcode}-2`}>
      <td>{item.product.name}</td>
      <td>{item.product.price.toFixed(2)}</td> {/* Ürün fiyatını 2 ondalık hane ile göstermek için toFixed kullanıldı */}
      <td></td> {/* Boş td eklendi, çünkü ikinci satırda toplam fiyatı göstermiyoruz */}
    </tr>
  ]);
  
  // Ara toplam, KDV ve toplam tutarı hesapla
  const subTotal = cart.reduce((total, product) => total + (product.quantity * product.price), 0);
  const tax = subTotal * 0.18; // KDV oranı %18 olarak varsayalım
  const total = subTotal + tax;

  return (
    
    <Receipt productList={productList} subTotal={subTotal} tax={tax} total={total} totalAmount={totalAmount} />   );
}

export default ReceiptArea;
