import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

// React-snap compatibility: Use hydrate for prerendered content, render for client-side
if (container.hasChildNodes()) {
  // Content is prerendered, use hydrate
  hydrateRoot(container, <App />);
} else {
  // No prerendered content, use normal render
  const root = createRoot(container);
  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
