import React, { useRef } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import Receipt from './Receipt'; // Receipt bileşenini doğru şekilde import edin
import './receipt.css';
import { Button } from "@mui/material";
import { useReactToPrint } from 'react-to-print'; // useReactToPrint'yi doğru şekilde import ettiğinizden emin olun

const ReceiptArea = () => {
  // CartContext'i kullanarak cart dizisine erişim sağla
  const { cart, totalAmount } = useGlobalContext();

  // Cart dizisinden gelen verileri kullanarak HTML'i oluştur
  const productList = cart.flatMap((item) => [
    <div className="receipt-line" key={`${item.product.barcode}-1`}>
      <span>{item.product.barcode} ({item.quantity} × {item.product.price})</span>
    </div>,
    <div className="receipt-line" key={`${item.product.barcode}-2`}>
      <span>{item.product.name}</span>
      <span>{(item.quantity * item.product.price).toFixed(2)}</span>
    </div>
  ]);

  // Ara toplam, KDV ve toplam tutarı hesapla
  const subTotal = cart.reduce((total, product) => total + (product.quantity * product.product.price), 0);
  const tax = subTotal * 0.18; // KDV oranı %18 olarak varsayalım
  const total = subTotal + tax;

  const componentRef = useRef();

  // Yazdırma işlemi için kullanılacak kancayı al
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Yazdırma düğmesine tıklandığında çalışacak fonksiyon
  const handlePrintButtonClick = () => {
    handlePrint(); // Yazdırma işlemini başlat
  };

  return (
    <>
      {/* Yazdırma düğmesi */}
      <Button variant="outlined" onClick={handlePrintButtonClick}>Print Receipt</Button>

      {/* Görüntülenecek bileşen */}
      <Receipt productList={productList} subTotal={subTotal} tax={tax} total={total} totalAmount={totalAmount} ref={componentRef} />
    </>
  );
}

export default ReceiptArea;
