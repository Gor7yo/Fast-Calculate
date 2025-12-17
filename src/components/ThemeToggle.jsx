import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const ThemeToggle = ({ isLightTheme, onToggle }) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      title="Переключить тему"
    >
      <FontAwesomeIcon icon={isLightTheme ? faSun : faMoon} />
    </button>
  );
};