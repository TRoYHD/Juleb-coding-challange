// src/index.tsx - Updated for React 18
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import Ionic styles
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Your custom CSS if any
import './index.css'; // Make sure this file exists or remove this import

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container!);

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);