import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import './index.css';

import { Root } from './Root';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <Root />
  </Router>,
);
