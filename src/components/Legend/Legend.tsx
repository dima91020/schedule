import React from "react";
import './Legend.css'

export const Legend: React.FC = () => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <span className="legend-color day_backlight"></span>
        <span>Поточний день</span>
      </div>
      <div className="legend-item">
        <span className="legend-color current_pair"></span>
        <span>Поточна пара</span>
      </div>
      <div className="legend-item">
        <span className="legend-color closest_pair"></span>
        <span>Наступна пара</span>
      </div>
    </div>
  );
};