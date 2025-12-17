import React, { useState, useEffect } from 'react';
import { ItemForm } from './components/ItemForm';
import { ThemeToggle } from './components/ThemeToggle';
import { TotalSection } from './components/TotalSection';
import { ItemList } from './components/ItemList';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
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

  const handleUpdateItem = (id, newQuantity, newPrice) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity, price: newPrice } : item
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
      />
    </div>
  );
}

export default App;