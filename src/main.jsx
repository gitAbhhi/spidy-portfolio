import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { SettingsProvider } from './settings'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </MotionConfig>
  </React.StrictMode>
)
