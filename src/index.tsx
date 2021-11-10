import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { initPanel } from './extension/panel';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <div>Debugman App</div>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// Init devtools panel.
initPanel();
