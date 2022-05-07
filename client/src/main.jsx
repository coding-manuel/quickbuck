import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from "react-router-dom";
import { TransactionsProvider } from './context/TransactionsContext';
import { NotificationsProvider } from '@mantine/notifications';

import { theme } from './theme';
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={theme}
    >
      <NotificationsProvider>
        <BrowserRouter>
          <TransactionsProvider>
            <App />
          </TransactionsProvider>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
)
