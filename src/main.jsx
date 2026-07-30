import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Remove pre-rendered hero BEFORE React mounts to prevent forced reflow.
// Using remove() instead of display:none avoids style invalidation that causes layout recalculation.
const preHero = document.getElementById('pre-hero');
if (preHero) {
  preHero.remove(); // Synchronous DOM removal — no reflow triggered
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
