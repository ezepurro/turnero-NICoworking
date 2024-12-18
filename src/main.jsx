import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Turnero from './Turnero.jsx';

import './index.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Turnero /> 
    </BrowserRouter>
  </StrictMode>,
)
