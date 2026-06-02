import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// StrictMode removed - caused double-mount issues with timer
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
