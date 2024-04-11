import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

const ReceiptArea = () => {
  // CartContext'i kullanarak cart dizisine erişim sağla
  const { cart } = useGlobalContext();

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
    <div className="receipt">
      <div className="header">
        <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px' }}>Market Adı</h1> {/* Başlık için stil düzenlemesi yapıldı */}
      </div>
      <div className="address">
        <p style={{ marginBottom: '5px', fontSize: '16px' }}>Adres</p> {/* Adres için stil düzenlemesi yapıldı */}
        <p style={{ marginBottom: '5px', fontSize: '16px' }}>Telefon Numarası</p> {/* Telefon numarası için stil düzenlemesi yapıldı */}
      </div>
      <div className="divider" style={{ borderBottom: '2px solid #ccc', marginBottom: '10px' }}></div> {/* Ayırıcı için stil düzenlemesi yapıldı */}
      <div className="info">
        <p style={{ fontSize: '16px' }}>Tarih: [Tarih]</p>
        <p style={{ fontSize: '16px' }}>Saat: [Saat]</p>
        <p style={{ fontSize: '16px' }}>Fiş No: [Fiş Numarası]</p>
        <p style={{ fontSize: '16px' }}>Kasiyer: Ahmet</p>
        <p style={{ fontSize: '16px' }}>Ödeme: [Ödeme Şekli]</p>
      </div>
      <div className="divider" style={{ borderBottom: '2px solid #ccc', marginBottom: '10px' }}></div> {/* Ayırıcı için stil düzenlemesi yapıldı */}
      <div className="products">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 0', textAlign: 'left', fontSize: '18px', color: '#333', fontWeight: 'bold' }}>Ürün Kodu</th>
              <th style={{ padding: '8px 0', textAlign: 'left', fontSize: '18px', color: '#333', fontWeight: 'bold' }}>Adet × Fiyat</th>
              <th style={{ padding: '8px 0', textAlign: 'left', fontSize: '18px', color: '#333', fontWeight: 'bold' }}>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {productList}
          </tbody>
        </table>
      </div>
      <div className="total">
        <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>Ara Toplam: {subTotal.toFixed(2)}</p> {/* Ara toplam için stil düzenlemesi yapıldı */}
        <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>KDV: {tax.toFixed(2)}</p> {/* KDV için stil düzenlemesi yapıldı */}
        <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>Toplam: {total.toFixed(2)}</p> {/* Toplam için stil düzenlemesi yapıldı */}
      </div>
    </div>
  );
}

export default ReceiptArea;
 