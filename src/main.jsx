import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Mount React root immediately — pre-hero is already hidden by CSS/React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Remove pre-rendered hero AFTER first paint using double-rAF to prevent forced reflow.
// Synchronous removal before React mounts invalidates styles and triggers layout recalculation
// on the critical initialization path. Double-rAF defers it past the first committed frame.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const preHero = document.getElementById('pre-hero');
    if (preHero) preHero.remove();
  });
});

