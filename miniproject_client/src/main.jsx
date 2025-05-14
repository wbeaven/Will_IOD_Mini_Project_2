import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DayProvider } from './context/DayContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DayProvider>
      <App />
    </DayProvider>
  </StrictMode>,
)
