// File location: frontend/src/main.jsx - React application entry point
// This file bootstraps the React app and mounts it to the DOM

// StrictMode - React development mode wrapper that highlights potential problems
import { StrictMode } from 'react'

// createRoot - React 18+ API for rendering the app into the DOM
// Replaces legacy ReactDOM.render() with concurrent rendering features
import { createRoot } from 'react-dom/client'

// Global CSS styles - applies to entire application
import './index.css'

// Main App component - contains all application logic and UI (from src/App.jsx)
import App from './App.jsx'

// Mount React app to DOM:
// 1. document.getElementById('root') finds the <div id="root"> in frontend/index.html
// 2. createRoot() creates a React root container for rendering
// 3. render() mounts the App component wrapped in StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

