import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import Receipt from './Receipt'; // Receipt bileşenini doğru şekilde import edin
import './receipt.css'

const ReceiptArea = () => {
  // CartContext'i kullanarak cart dizisine erişim sağla
  const { cart, totalAmount } = useGlobalContext();

  // Cart dizisinden gelen verileri kullanarak HTML'i oluştur
  const productList = cart.flatMap((item) => [
    <div className="receipt-line">
      <span>{item.product.barcode} ({item.quantity} × {item.product.price})</span>
    </div>,
    <div className="receipt-line">
      <span>{item.product.name}</span>
      <span>{(item.quantity * item.product.price).toFixed(2)}</span>
    </div>
  ]);
  
  
 
  // Ara toplam, KDV ve toplam tutarı hesapla
  const subTotal = cart.reduce((total, product) => total + (product.quantity * product.price), 0);
  const tax = subTotal * 0.18; // KDV oranı %18 olarak varsayalım
  const total = subTotal + tax;

  return (
    <> 
   
    <Receipt productList={productList} subTotal={subTotal} tax={tax} total={total} totalAmount={totalAmount} />  
    </> 
    );
}
    

export default ReceiptArea;
