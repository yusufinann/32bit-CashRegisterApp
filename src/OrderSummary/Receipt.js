import React from 'react';

function Receipt({ productList, subTotal, tax, totalAmount }) {
  return (
    <div className="receipt">
      <div className="header">
        <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px' }}>Market Adı</h1>
      </div>
      <div className="address">
        <p style={{ marginBottom: '5px', fontSize: '16px' }}>Adres</p>
        <p style={{ marginBottom: '5px', fontSize: '16px' }}>Telefon Numarası</p>
      </div>
      <div className="divider" style={{ borderBottom: '2px solid #ccc', marginBottom: '10px' }}></div>
      <div className="info">
        <p style={{ fontSize: '16px' }}>Tarih: [Tarih]</p>
        <p style={{ fontSize: '16px' }}>Saat: [Saat]</p>
        <p style={{ fontSize: '16px' }}>Fiş No: [Fiş Numarası]</p>
        <p style={{ fontSize: '16px' }}>Kasiyer: Ahmet</p>
        <p style={{ fontSize: '16px' }}>Ödeme: [Ödeme Şekli]</p>
      </div>
      <div className="divider" style={{ borderBottom: '2px solid #ccc', marginBottom: '10px' }}></div>
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
        <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>Ara Toplam: {subTotal.toFixed(2)}</p>
        <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>KDV: {tax.toFixed(2)}</p>
        <p style={{ fontSize: '18px', color: '#333', marginBottom: '5px' }}>Toplam: {totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Receipt;