import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply optional Emerald+Gold palette when user chose 'alt' in localStorage
if (typeof document !== 'undefined' && localStorage.getItem('meeet_theme') === 'alt') {
  document.documentElement.classList.add('theme-alt');
}

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
