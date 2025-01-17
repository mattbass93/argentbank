import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importez le composant principal
import './assets/css/main.css'; // Importez vos styles globaux

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
