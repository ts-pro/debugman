import { store } from '@/store/store';
import { websocketAdd } from '@/store/websocket-slice/websocket-slice';

import { PortMessage, PortName } from './types/types';

const PORT_NAME: PortName = 'devtools';

export function initPanel() {
  const port = chrome.runtime.connect({
    name: PORT_NAME,
  });

  port.postMessage({
    action: '__debugman_init__',
    tabId: chrome.devtools.inspectedWindow.tabId,
  } as PortMessage);

  port.onMessage.addListener(async function (message) {
    store.dispatch(websocketAdd(JSON.stringify(message)));
  });
}
