import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

// The service worker in ./service-worker.js is registered by vite-plugin-pwa.

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
