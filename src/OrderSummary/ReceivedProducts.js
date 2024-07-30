import React from 'react';
import './ReceivedProducts.css'; // Import the CSS file for styling

const ReceivedProducts = ({cart,t}) => {
    const productList = cart.map((item) => (
        <div key={item.product.barcode} className="product-container">
            <div className="product-line">
                <span className="product-info">{item.product.barcode} ({item.quantity} × {item.product.price.toFixed(2)}) TL</span>
            </div>
            <div className="product-line details">
                <span>{item.product.name} - {item.product.vat_rate}% {t('Vat')}</span>
                <span>{item.totalPrice.toFixed(2)} TL</span>
            </div>
        </div>  
    ));

    return (
        <div className="received-products">
            {productList}
        </div>
    );
};

export default ReceivedProducts;
