import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// @ts-expect-error: cant find declaration
import { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.variable.min.css';

import Grpc from '@/pages/Grpc/Grpc';
import { DarkModeButton } from '@/pages/Websocket/components/WebsocketUi/DarkModeButton/DarkModeButton';
import Websocket from '@/pages/Websocket/Websocket';

import { darkTheme, lightTheme } from './assets/dark-mode';
import { GlobalStyles } from './assets/global';
import { initPanel } from './extension/panel';
import { store } from './store/store';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const toggleTheme = (forceTheme?: 'dark' | 'light'): void => {
    if (forceTheme) {
      return setTheme(forceTheme);
    }

    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const detectColorScheme = () => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      toggleTheme('dark');
    }
  };

  useEffect(() => detectColorScheme());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <DarkModeButton toggleColorMode={toggleTheme} theme={theme} />
            <Routes>
              <Route path="/websocket" element={<Websocket />} />
              <Route path="/grpc" element={<Grpc />} />
              <Route path="*" element={<Websocket />} />
            </Routes>
          </ThemeProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// Init devtools panel.
initPanel();
