import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppointmentScheduler from './AppointmentScheduler.jsx';

import './index.css';

// Fonts
import './styles/fonts/Kudryashev Display/kudryashevDisplay.css';
import './styles/fonts/Tan Meringue/tanMeringue.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppointmentScheduler /> 
    </BrowserRouter>
  </StrictMode>,
)
