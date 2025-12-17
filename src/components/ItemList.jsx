import React from 'react';
import { ItemRow } from './ItemRow.jsx';

export const ItemList = ({ items, onUpdateItem, onDeleteItem, onClearAll }) => {
  const handleClearAll = () => {
    if (items.length === 0) return;
    
    if (window.confirm('Вы уверены, что хотите удалить все предметы?')) {
      onClearAll();
    }
  };

  return (
    <section className="items-section">
      <h2 className="section-title">
        <i className="fas fa-list"></i> Добавленные предметы
      </h2>
      
      <div className="items-list">
        {items.length === 0 ? (
          <div className="empty-message">
            <i className="fas fa-clipboard-list fa-3x" style={{ marginBottom: '15px', opacity: 0.5 }}></i>
            <p>Список предметов пуст</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              Добавьте первый предмет, используя форму слева
            </p>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
              />
            ))}
          </>
        )}
      </div>
      
      {items.length > 0 && (
        <div className="action-buttons" style={{ marginTop: '20px' }}>
          <button className="btn btn-secondary" onClick={handleClearAll}>
            <i className="fas fa-trash-alt"></i> Очистить все
          </button>
        </div>
      )}
    </section>
  );
};