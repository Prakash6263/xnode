import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Your main App component where BrowserRouter is likely defined


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Remove Web3Provider wrapper */}
    <App /> {/* App component should contain BrowserRouter internally */}
  </React.StrictMode>
);
