import React from 'react';

const TotalSection = ({ items, onResetAllPrices, onToggleAllItems }) => {
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
    return items.reduce((total, item) => {
      if (item.isActive !== false) {
        return total + (item.quantity * item.price);
      }
      return total;
    }, 0);
  };

  const handleResetAllPrices = () => {
    if (items.length === 0) return;

    if (window.confirm('Вы уверены, что хотите сбросить все цены на 0? Все предметы станут бесплатными.')) {
      onResetAllPrices();
    }
  };

  const handleToggleAllItems = () => {
    if (items.length === 0) return;

    const activeItemsCount = items.filter(item => item.isActive !== false).length;
    const shouldActivate = activeItemsCount < items.length;

    if (window.confirm(`Вы уверены, что хотите ${shouldActivate ? 'включить все предметы' : 'выключить все предметы'}?`)) {
      onToggleAllItems(shouldActivate);
    }
  };

  const activeItemsCount = items.filter(item => item.isActive !== false).length;
  const inactiveItemsCount = items.length - activeItemsCount;

  return (
    <section className="total-section">
      <div className="total-display">
        <div className="total-label">
          <i className="fas fa-calculator"></i> Общая стоимость всех предметов:
          <div className="items-stats">
            <span className="active-items">Активных: {activeItemsCount}</span>
            {inactiveItemsCount > 0 && (
              <span className="inactive-items">Выключенных: {inactiveItemsCount}</span>
            )}
          </div>
        </div>
        <div className="total-amount">
          {formatPrice(calculateTotal())}
        </div>
      </div>

      {items.length > 0 && (
        <div className="total-actions">
          <div className="total-action-buttons">
            <button className="btn btn-secondary" onClick={handleToggleAllItems}>
              <i className="fas fa-power-off"></i> {activeItemsCount === items.length ? 'Выключить все' : 'Включить все'}
            </button>
            <button className="btn btn-warning" onClick={handleResetAllPrices}>
              <i className="fas fa-undo-alt"></i> Сбросить все цены на 0
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TotalSection;