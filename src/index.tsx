import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'antd/dist/antd.less';

import Grpc from '@/pages/Grpc/Grpc';
import Websocket from '@/pages/Websocket/Websocket';

import { initPanel } from './extension/panel';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/websocket" element={<Websocket />} />
          <Route path="/grpc" element={<Grpc />} />
          <Route path="*" element={<Websocket />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// Init devtools panel.
initPanel();
