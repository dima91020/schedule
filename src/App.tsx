import React from 'react';
import './style/style.css';

import { Sidebar } from './components/Sidebar';
import { Schedule } from './components/Schedule';

export const App: React.FC = () => {
  return (
    <>
      <div className="container">
        <Sidebar />
        <Schedule />
      </div>
    </>
  );
};
