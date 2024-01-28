import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.js';

const container = document.getElementById('root');
const root = createRoot(container);

// Wrap the App component with the Provider
root.render(
    <App />
);
