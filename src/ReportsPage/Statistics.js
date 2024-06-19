// Statistics.js
import React from "react";
import { useCartContext } from "../contexts/CartContext";
import {
  calculateTotalSalesQuantity,
  calculateSalesAmount,
  calculatePaymentTypes,
  calculateProductsSoldQuantity,
  findMostSoldProducts,
  findLeastSoldProducts,
  findMostProfitableProducts,
  findLeastProfitableProducts,
  calculateTotalVAT,
  findMostUsedPaymentMethod,
  calculateSubTotal,
  calculateTotalDiscount,
} from "./StatisticFunctions";
import "./Statistics.css";

const Statistics = ({ theme }) => {
  const { receipts } = useCartContext();

  if (!receipts || receipts.length === 0) {
    return <div style={{color:theme==='dark' ? 'white':'black'}}>Henüz hiç fiş bulunmamaktadır.</div>;
  }

  const totalSalesQuantity = calculateTotalSalesQuantity(receipts);
  const totalSalesAmount = calculateSalesAmount(receipts);
  const paymentTypes = calculatePaymentTypes(receipts);
  const productsSoldQuantity = calculateProductsSoldQuantity(receipts);
  const mostSoldProducts = findMostSoldProducts(productsSoldQuantity);
  const leastSoldProducts = findLeastSoldProducts(productsSoldQuantity);
  const mostProfitableProducts = findMostProfitableProducts(receipts);
  const leastProfitableProducts = findLeastProfitableProducts(receipts);
  const totalVAT = calculateTotalVAT(receipts);
  const mostUsedPaymentMethod = findMostUsedPaymentMethod(receipts);
  const totalSubTotal = calculateSubTotal(receipts);
  const totalDiscount = calculateTotalDiscount(totalSubTotal, totalSalesAmount);
  const cellTheme = theme === 'dark' ? 'statistics-table-cell dark' : 'statistics-table-cell';
  return (
    <div className="statistics-container">
      <div className={`statistics-paper ${theme === 'dark' ? 'dark' : ''}`}>
        <h4 className={`statistics-title ${theme === 'dark' ? 'dark' : ''}`}>Mağaza İstatistikleri</h4>
        <table className="statistics-table">
          <thead className="statistics-table-head">
            <tr>
              <th className="statistics-table-cell">İstatistik</th>
              <th className="statistics-table-cell">Değer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Toplam Satılan ürün miktarı</td>
              <td className={cellTheme}>{totalSalesQuantity}</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Mağaza Toplam Satış Tutarı</td>
              <td className={cellTheme}>{totalSalesAmount} TL</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Toplam Kdv Tutarı</td>
              <td className={cellTheme}>{totalVAT} TL</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Toplam satış tutarı en yüksek olan ürün</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {mostProfitableProducts.map((product, index) => (
                    <li key={index} className="statistics-list-item">
                      <span className="statistics-list-item primary">Ürün Adı: {product.name}</span>
                      <br />
                      <span className="statistics-list-item secondary">Barkod: {product.barcode}</span>
                      <br />
                      <span className="statistics-list-item secondary">Satış Tutarı: {product.price}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Toplam satış tutarı en az olan ürünler</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {leastProfitableProducts.map((product, index) => (
                    <li key={index} className="statistics-list-item">
                      <span className="statistics-list-item primary">Ürün Adı: {product.name}</span>
                      <br />
                      <span className="statistics-list-item secondary">Barkod: {product.barcode}</span>
                      <br />
                      <span className="statistics-list-item secondary">Satış Tutarı: {product.price}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Toplam Ara Toplam</td>
              <td className={cellTheme}>{totalSubTotal}</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Ödeme Türleri Dağılımı</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {Object.entries(paymentTypes).map(([type, count]) => (
                    <li key={type} className="statistics-list-item">{`${type}: ${count}`}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>En çok tercih edilen ödeme Yöntemi</td>
              <td className={cellTheme}>{mostUsedPaymentMethod}</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>En Çok Satan Ürünler (Trend Ürün)</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {mostSoldProducts.length > 0 ? (
                    mostSoldProducts.map((product, index) => (
                      <li key={index} className="statistics-list-item">{`${product.name} (${product.quantity} adet)`}</li>
                    ))
                  ) : (
                    <li className="statistics-list-item">Henüz satılan bir ürün yok.</li>
                  )}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>En Az Satan Ürünler</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {leastSoldProducts.length > 0 ? (
                    leastSoldProducts.map((product, index) => (
                      <li key={index} className="statistics-list-item">{`${product.name} (${product.quantity} adet)`}</li>
                    ))
                  ) : (
                    <li className="statistics-list-item">Henüz satılan bir ürün yok.</li>
                  )}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Ürünlerin Satış Dağılımı</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {Object.entries(productsSoldQuantity).map(([productName, quantity], index) => (
                    <li key={index} className="statistics-list-item">{`${productName}: ${quantity} adet`}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>Toplam Uygulanan İndirim</td>
              <td className={cellTheme}>{totalDiscount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
