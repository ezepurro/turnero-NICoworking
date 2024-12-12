import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Turnero from './Turnero.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Turnero /> 
    </BrowserRouter>
  </StrictMode>,
)
