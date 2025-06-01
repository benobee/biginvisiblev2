import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Add this to preload fonts
const preloadFonts = () => {
  const fontLinks = [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    }
  ];

  fontLinks.forEach(linkProps => {
    const link = document.createElement('link');
    Object.entries(linkProps).forEach(([key, value]) => {
      if (value) link.setAttribute(key, value);
    });
    document.head.appendChild(link);
  });
};

preloadFonts();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
