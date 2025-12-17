import React, { useState, useEffect } from 'react';

export const ItemRow = ({ item, onUpdateItem, onDeleteItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const [isActive, setIsActive] = useState(item.isActive !== undefined ? item.isActive : true);

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

  useEffect(() => {
    if (item.isActive !== isActive) {
      onUpdateItem(item.id, quantity, price, isActive);
    }
  }, [isActive, item.id, quantity, price, item.isActive, onUpdateItem]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onUpdateItem(item.id, newQuantity, price, isActive);
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value) || 0;
    if (newPrice >= 0) {
      setPrice(newPrice);
      onUpdateItem(item.id, quantity, newPrice, isActive);
    }
  };

  const handleQuickQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onUpdateItem(item.id, newQuantity, price, isActive);
    }
  };

  const handleQuickPriceChange = (newPrice) => {
    setPrice(newPrice);
    onUpdateItem(item.id, quantity, newPrice, isActive);
  };

  const handleToggleActive = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    onUpdateItem(item.id, quantity, price, newActiveState);
  };

  const handleDelete = () => {
    if (window.confirm('Удалить этот предмет?')) {
      onDeleteItem(item.id);
    }
  };

  const itemTotal = isActive ? quantity * price : 0;

  return (
    <div className={`item-row ${price === 0 ? 'free' : ''} ${!isActive ? 'inactive' : ''}`}>
      <div className="item-info">
        <div className={`item-name ${price === 0 ? 'free' : ''} ${!isActive ? 'inactive' : ''}`}>
          {item.name}
          {!isActive && <span className="inactive-badge"> (выключен)</span>}
        </div>

        <div className="item-controls">
          <div className="quantity-input-container">
            <span>Кол-во:</span>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              disabled={!isActive}
            />
          </div>

          <div className="item-quick-buttons">
            <button
              className="item-qty-btn negative"
              onClick={() => handleQuickQuantityChange(-50)}
              disabled={!isActive}
            >
              -50
            </button>
            <button
              className="item-qty-btn negative"
              onClick={() => handleQuickQuantityChange(-10)}
              disabled={!isActive}
            >
              -10
            </button>
            <button
              className="item-qty-btn negative"
              onClick={() => handleQuickQuantityChange(-5)}
              disabled={!isActive}
            >
              -5
            </button>
            <button
              className="item-qty-btn negative"
              onClick={() => handleQuickQuantityChange(-1)}
              disabled={!isActive}
            >
              -1
            </button>
            <button
              className="item-qty-btn positive"
              onClick={() => handleQuickQuantityChange(1)}
              disabled={!isActive}
            >
              +1
            </button>
            <button
              className="item-qty-btn positive"
              onClick={() => handleQuickQuantityChange(5)}
              disabled={!isActive}
            >
              +5
            </button>
            <button
              className="item-qty-btn positive"
              onClick={() => handleQuickQuantityChange(10)}
              disabled={!isActive}
            >
              +10
            </button>
            <button
              className="item-qty-btn positive"
              onClick={() => handleQuickQuantityChange(50)}
              disabled={!isActive}
            >
              +50
            </button>
          </div>
        </div>

        <div className="item-price-controls">
          <div className="price-input-container">
            <span>Цена:</span>
            <input
              type="number"
              className="price-input"
              value={price}
              onChange={handlePriceChange}
              min="0"
              step="0.01"
              disabled={!isActive}
            />
          </div>

          <button
            className="price-action-btn free"
            onClick={() => handleQuickPriceChange(0)}
            disabled={!isActive}
          >
            Бесплатно
          </button>
          <button
            className="price-action-btn"
            onClick={() => handleQuickPriceChange(100)}
            disabled={!isActive}
          >
            100
          </button>
          <button
            className="price-action-btn"
            onClick={() => handleQuickPriceChange(500)}
            disabled={!isActive}
          >
            500
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className={`item-price ${price === 0 ? 'free' : ''} ${!isActive ? 'inactive' : ''}`}>
          {isActive ? formatPrice(itemTotal) : '—'}
        </div>

        <button
          className={`slot-toggle-btn ${isActive ? 'active' : 'inactive'}`}
          onClick={handleToggleActive}
          title={isActive ? 'Выключить предмет (цена не учитывается)' : 'Включить предмет (цена учитывается)'}
        >
          <i className={`fas fa-power-off ${isActive ? 'active' : ''}`}></i>
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Удалить предмет"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};