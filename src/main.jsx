import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Remove the pre-rendered static hero once React takes over — prevents duplicate content
const preHero = document.getElementById('pre-hero');
if (preHero) {
  preHero.style.display = 'none';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
