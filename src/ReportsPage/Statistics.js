import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import StatisticItem from './StatisticItem';
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
} from './StatisticFunctions';
import { useTranslation } from 'react-i18next';
import './Statistics.css';

const Statistics = ({ theme }) => {
  const { receipts } = useCartContext();
  const { t } = useTranslation();

  if (!receipts || receipts.length === 0) {
    return (
      <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>
        {t('There are no receipts yet')}.
      </div>
    );
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

  return (
    <div className={`statistics-container ${theme} code-font `}>
      <h4 className={`statistics-title ${theme}`}>{t('Store Statistics')}</h4>
      <div className="statistics-items">
        <StatisticItem label={t('Total Amount of product sold')} value={totalSalesQuantity} theme={theme} />
        <StatisticItem label={t('Total Store Sales Amount')} value={`${totalSalesAmount} TL`} theme={theme} />
        <StatisticItem label={t('Total VAT Amount')} value={`${totalVAT} TL`} theme={theme} />
        <StatisticItem label={t('Most profitable products')} value={mostProfitableProducts.map(p => `${p.name}: ${p.price} TL`).join(', ')} theme={theme} />
        <StatisticItem label={t('Least profitable products')} value={leastProfitableProducts.map(p => `${p.name}: ${p.price} TL`).join(', ')} theme={theme} />
        <StatisticItem label={t('Total Subtotal')} value={totalSubTotal} theme={theme} />
        <StatisticItem label={t('Payment Types')} value={Object.entries(paymentTypes).map(([type, count]) => `${type}: ${count}`).join(', ')} theme={theme} />
        <StatisticItem label={t('Most used payment method')} value={mostUsedPaymentMethod} theme={theme} />
        <StatisticItem label={t('Best Selling Products (Trending Product)')} value={mostSoldProducts.map(p => `${p.name}: ${p.quantity}`).join(', ')} theme={theme} />
        <StatisticItem label={t('Least Selling Products')} value={leastSoldProducts.map(p => `${p.name}: ${p.quantity}`).join(', ')} theme={theme} />
        <StatisticItem label={t('Sales Breakdown of Products')} value={Object.entries(productsSoldQuantity).map(([name, qty]) => `${name}: ${qty}`).join(', ')} theme={theme} />
        <StatisticItem label={t('Total Discount Applied')} value={totalDiscount} theme={theme} />
      </div>
    </div>
  );
};

export default Statistics;
