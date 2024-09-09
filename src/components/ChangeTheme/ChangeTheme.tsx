import React, { useEffect, useState } from 'react';

export const ChangeTheme: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('lightmode') === 'true';
  });

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('lightmode', String(isLightMode));
  }, [isLightMode]);

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <span style={{ display: 'flex', justifyContent: 'center' }} id="ctl00_MainContent_lblHeader">
      <button className="btn" onClick={toggleLightMode}>
        Змінити тему
      </button>
    </span>
  );
};
