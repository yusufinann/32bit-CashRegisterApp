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
import { useTranslation } from "react-i18next";

const Statistics = ({ theme}) => {
  const { receipts } = useCartContext();
   const{t}=useTranslation();
  if (!receipts || receipts.length === 0) {
    return <div style={{color:theme==='dark' ? 'white':'black'}}>{t('There are no receipts yet')}.</div>;
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
        <h4 className={`statistics-title ${theme === 'dark' ? 'dark' : ''}`}>{t('Store Statistics')}</h4>
        <table className="statistics-table">
          <thead className="statistics-table-head">
            <tr>
              <th className="statistics-table-cell">{t('Statistics')}</th>
              <th className="statistics-table-cell">{t('Value')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Total Amount of product sold')}</td>
              <td className={cellTheme}>{totalSalesQuantity}</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Total Store Sales Amount')}</td>
              <td className={cellTheme}>{totalSalesAmount} TL</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Total VAT Amount')}</td>
              <td className={cellTheme}>{totalVAT} TL</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('The product with the highest total sales amount')}</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {mostProfitableProducts.map((product, index) => (
                    <li key={index} className="statistics-list-item">
                      <span className="statistics-list-item primary">{t('Product Name')}: {product.name}</span>
                      <br />
                      <span className="statistics-list-item secondary">{t('Barcode')}: {product.barcode}</span>
                      <br />
                      <span className="statistics-list-item secondary">{t('Sales Amount')}: {product.price}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Products with the lowest total sales')}</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {leastProfitableProducts.map((product, index) => (
                    <li key={index} className="statistics-list-item">
                      <span className="statistics-list-item primary">{t('Product Name')}: {product.name}</span>
                      <br />
                      <span className="statistics-list-item secondary">{t('Barcode')}: {product.barcode}</span>
                      <br />
                      <span className="statistics-list-item secondary">{t('Sales Amount')}: {product.price}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Total Subtotal')}</td>
              <td className={cellTheme}>{totalSubTotal}</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Distribution of Payment Types')}</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {Object.entries(paymentTypes).map(([type, count]) => (
                    <li key={type} className="statistics-list-item">{`${type}: ${count}`}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Most preferred payment method')}</td>
              <td className={cellTheme}>{mostUsedPaymentMethod}</td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Best Selling Products (Trending Product)')}</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {mostSoldProducts.length > 0 ? (
                    mostSoldProducts.map((product, index) => (
                      <li key={index} className="statistics-list-item">{`${product.name} (${product.quantity} adet)`}</li>
                    ))
                  ) : (
                    <li className="statistics-list-item">{t('No products sold yet')}.</li>
                  )}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Least Selling Products')}</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {leastSoldProducts.length > 0 ? (
                    leastSoldProducts.map((product, index) => (
                      <li key={index} className="statistics-list-item">{`${product.name} (${product.quantity} adet)`}</li>
                    ))
                  ) : (
                    <li className="statistics-list-item">{t('No products sold yet')}.</li>
                  )}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Sales Breakdown of Products')}</td>
              <td className={cellTheme}>
                <ul className="statistics-list">
                  {Object.entries(productsSoldQuantity).map(([productName, quantity], index) => (
                    <li key={index} className="statistics-list-item">{`${productName}: ${quantity} adet`}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="statistics-table-row">
              <td className={cellTheme}>{t('Total Discount Applied')}</td>
              <td className={cellTheme}>{totalDiscount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;