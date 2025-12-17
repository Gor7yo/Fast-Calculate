import React from 'react';

export const TotalSection = ({ items, onResetAllPrices }) => {
  const formatPrice = (price) => {
    const roundedPrice = Math.round(price * 100) / 100;
    let priceStr = roundedPrice.toString();
    
    if (priceStr.includes('.')) {
      priceStr = priceStr.replace(/\.?0+$/, '');
      const parts = priceStr.split('.');
      if (parts.length === 2 && parts[1].length === 1) {
        priceStr += '0';
      }
    }
    
    return priceStr;
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleResetAllPrices = () => {
    if (items.length === 0) return;
    
    if (window.confirm('Вы уверены, что хотите сбросить все цены на 0? Все предметы станут бесплатными.')) {
      onResetAllPrices();
    }
  };

  return (
    <section className="total-section">
      <div className="total-display">
        <div className="total-label">
          <i className="fas fa-calculator"></i> Общая стоимость всех предметов:
        </div>
        <div className="total-amount">
          {formatPrice(calculateTotal())}
        </div>
      </div>
      
      {items.length > 0 && (
        <div className="reset-all-prices">
          <button className="btn btn-warning" onClick={handleResetAllPrices}>
            <i className="fas fa-undo-alt"></i> Сбросить все цены на 0
          </button>
        </div>
      )}
    </section>
  );
};