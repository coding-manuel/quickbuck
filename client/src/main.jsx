import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from "react-router-dom";
import { TransactionsProvider } from './context/TransactionsContext';

import { theme } from './theme';
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={theme}
    >
      <BrowserRouter>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)
