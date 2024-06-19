import React, { useRef } from 'react';
import Receipt from './Receipt'; // Receipt bileşenini doğru şekilde import edin
import './receipt.css';
import { Button } from "@mui/material";
import { useReactToPrint } from 'react-to-print'; // useReactToPrint'yi doğru şekilde import ettiğinizden emin olun
import { useCartContext } from '../contexts/CartContext';
  const ReceiptArea = () => {
    // CartContext'i kullanarak cart dizisine erişim sağla
    const { cart } = useCartContext();
  
  
    // Cart dizisinden gelen verileri kullanarak HTML'i oluştur
    const productList = cart.flatMap((item) => (
      <React.Fragment key={item.product.barcode}>
        <div className="receipt-line">
          <span>{item.product.barcode} ({item.quantity} × {item.product.price.toFixed(2)})</span>
        </div>
        <div className="receipt-line">
          <span>{item.product.name} - %{item.product.vat_rate}</span>
          <span>{item.totalPrice.toFixed(2)}</span>
         
        </div>
        
      </React.Fragment>
      
    ));
    
  
  
  
    // Ara toplam, KDV ve toplam tutarı hesapla
    const subTotal = (cart.reduce((total, product) => total + (product.quantity * product.product.price), 0)).toFixed(2);
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
        <Receipt productList={productList} subTotal={subTotal} tax={tax} total={total}  ref={componentRef} />
      </>
    );
  }
  
  export default ReceiptArea;
  