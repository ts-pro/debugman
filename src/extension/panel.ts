import { store } from '@/store/store';
import { websocketAdd } from '@/store/websocket-slice/websocket-slice';

import { PortMessage, PortName } from './types/types';

const PORT_NAME: PortName = 'devtools';

export function initPanel() {
  try {
    const port = chrome.runtime.connect({
      name: PORT_NAME,
    });

    port.postMessage({
      action: '__debugman_init__',
      tabId: chrome.devtools.inspectedWindow.tabId,
    } as PortMessage);

    port.onMessage.addListener(async function (message: PortMessage) {
      if (message.action === '__debugman_websocket__' && message.data) {
        store.dispatch(websocketAdd(message.data));
      }
    });
  } catch (e) {
    // Means that we run in `dev` mode.
    window.addEventListener('message', ({ data }: { data: PortMessage }) => {
      if (data.action === '__debugman_websocket__' && data.data) {
        store.dispatch(websocketAdd(data.data));
      }
    });
  }
}
