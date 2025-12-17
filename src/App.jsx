import React, { useState, useEffect } from 'react';
import './App.css';
import TotalSection from './components/TotalSection';
import ItemForm from './components/ItemForm';
import { ItemList } from './components/ItemList';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      // Добавляем поле isActive для старых записей
      return parsedItems.map(item => ({
        ...item,
        isActive: item.isActive !== undefined ? item.isActive : true
      }));
    }
    return [];
  });

  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light';
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    document.body.classList.toggle('light-theme', isLightTheme);
  }, [isLightTheme]);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleUpdateItem = (id, newQuantity, newPrice, isActive) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity, price: newPrice, isActive } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleResetAllPrices = () => {
    setItems(prevItems =>
      prevItems.map(item => ({ ...item, price: 0 }))
    );
  };

  const handleToggleAllItems = (activate) => {
    setItems(prevItems =>
      prevItems.map(item => ({ ...item, isActive: activate }))
    );
  };

  const toggleTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <div className="container">
      <header>
        <h1>
          <i className="fas fa-calculator"></i> Учет предметов и стоимости
        </h1>
        <p className="subtitle">
          Добавляйте предметы, указывайте количество и цену, автоматически рассчитывайте общую стоимость
        </p>
        <ThemeToggle isLightTheme={isLightTheme} onToggle={toggleTheme} />
      </header>

      <div className="main-content">
        <ItemForm onAddItem={handleAddItem} />
        <ItemList
          items={items}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          onClearAll={handleClearAll}
        />
      </div>

      <TotalSection
        items={items}
        onResetAllPrices={handleResetAllPrices}
        onToggleAllItems={handleToggleAllItems}
      />
    </div>
  );
}

export default App;