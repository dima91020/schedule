import React from "react";
import './CallMeStyles.css';

export const CallMe: React.FC = () => {
  return (
    <div className="call-me-container">
      {/* <p className="call-me-text">
        Have any idea how to improve this page? Just call me:
      </p> */}
      <p className="call-me-text">
        Маєте ідеї, як покращити цю сторінку? Зв'яжіться зі мною:
      </p>
      <a
        href="https://t.me/devlll999"
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-link"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
          alt="Telegram"
          className="telegram-icon"
        />
        <span className="telegram-text">Telegram</span>
      </a>
    </div>
  );
};
