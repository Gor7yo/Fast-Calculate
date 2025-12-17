import React, { useState } from 'react';

const ItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName.trim()) {
      alert('Пожалуйста, введите название предмета');
      return;
    }

    const quantity = parseInt(itemQuantity);
    const price = parseFloat(itemPrice);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Пожалуйста, введите корректное количество');
      return;
    }

    if (isNaN(price) || price < 0) {
      alert('Пожалуйста, введите корректную цену');
      return;
    }

    onAddItem({
      id: Date.now(),
      name: itemName,
      quantity,
      price,
      isActive
    });

    // Сброс формы
    setItemName('');
    setItemQuantity(1);
    setItemPrice('');
    setIsActive(true);
  };

  const handleQuantityQuickButton = (value) => {
    setItemQuantity(prev => {
      const newValue = parseInt(prev) + value;
      return newValue < 1 ? 1 : newValue;
    });
  };

  const handlePriceQuickButton = (price) => {
    setItemPrice(price);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <section className="form-section">
      <h2 className="section-title">
        <i className="fas fa-plus-circle"></i> Добавить новый предмет
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">
            <i className="fas fa-tag"></i> Название предмета
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Например: Книга, Наушники, Кофе"
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemQuantity">
            <i className="fas fa-boxes"></i> Количество
          </label>
          <input
            type="number"
            id="itemQuantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            min="1"
          />

          <div className="quick-buttons">
            <button
              type="button"
              className="quick-btn"
              onClick={() => handleQuantityQuickButton(1)}
            >
              +1
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={() => handleQuantityQuickButton(5)}
            >
              +5
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={() => handleQuantityQuickButton(10)}
            >
              +10
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={() => handleQuantityQuickButton(50)}
            >
              +50
            </button>
            <button
              type="button"
              className="quick-btn"
              id="resetQty"
              onClick={() => setItemQuantity(1)}
            >
              Сброс
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="itemPrice">
            <i className="fas fa-money-bill-wave"></i> Цена за единицу
          </label>
          <input
            type="number"
            id="itemPrice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            min="0"
            step="0.01"
            placeholder="0.00"
          />

          <div className="price-quick-buttons">
            <button
              type="button"
              className="price-btn free"
              onClick={() => handlePriceQuickButton(0)}
            >
              Бесплатно
            </button>
            <button
              type="button"
              className="price-btn"
              onClick={() => handlePriceQuickButton(100)}
            >
              100
            </button>
            <button
              type="button"
              className="price-btn"
              onClick={() => handlePriceQuickButton(500)}
            >
              500
            </button>
            <button
              type="button"
              className="price-btn"
              onClick={() => handlePriceQuickButton(1000)}
            >
              1000
            </button>
            <button
              type="button"
              className="price-btn"
              onClick={() => handlePriceQuickButton(2500)}
            >
              2500
            </button>
            <button
              type="button"
              className="price-btn"
              id="resetPrice"
              onClick={() => setItemPrice('')}
            >
              Сброс
            </button>
          </div>
        </div>

        <div className="form-group">
          <div className="slot-toggle-container">
            <label htmlFor="itemActive" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className={`slot-toggle-preview ${isActive ? 'active' : 'inactive'}`}>
                <i className={`fas fa-power-off ${isActive ? 'active' : ''}`}></i>
              </div>
              <span>
                {isActive ? 'Предмет активен (цена учитывается)' : 'Предмет выключен (цена не учитывается)'}
              </span>
            </label>
            <button
              type="button"
              className={`slot-toggle-btn-form ${isActive ? 'active' : 'inactive'}`}
              onClick={() => setIsActive(!isActive)}
              title={isActive ? 'Выключить предмет' : 'Включить предмет'}
            >
              {isActive ? 'Включено' : 'Выключено'}
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-plus"></i> Добавить предмет
          </button>
        </div>
      </form>
    </section>
  );
};

export default ItemForm;