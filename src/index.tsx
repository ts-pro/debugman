import React from 'react';
import ReactDOM from 'react-dom';
import { initPanel } from './extension/panel';

ReactDOM.render(
  <React.StrictMode>
    <div>TEST 2 OLOLO 5</div>
  </React.StrictMode>,
  document.getElementById('root')
);

// Init devtools panel.
initPanel();
