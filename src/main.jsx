import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Turnero from './Turnero.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Turnero />
  </StrictMode>,
)
