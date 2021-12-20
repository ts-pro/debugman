import { store } from '@/store/store';
import {
  websocketAdd,
  clearLog,
} from '@/store/websocket-slice/websocket-slice';

import { PortMessage, PortName } from './types/types';

const PORT_NAME: PortName = 'devtools';

export function initPanel() {
  try {
    const port = chrome.runtime.connect({
      name: PORT_NAME,
    });

    const tabId = chrome.devtools.inspectedWindow.tabId;

    port.postMessage({
      action: '__debugman_init__',
      tabId,
    } as PortMessage);

    port.onMessage.addListener(async function (message: PortMessage) {
      if (message.action === '__debugman_websocket__' && message.data) {
        store.dispatch(websocketAdd(message.data));
      }
    });

    if (chrome?.tabs?.onUpdated) {
      chrome.tabs.onUpdated.addListener((tId, { status }) => {
        if (tId === tabId && status === 'loading') {
          store.dispatch(clearLog({ force: false }));
        }
      });
    }
  } catch (e) {
    // Means that we run in `dev` mode.
    window.addEventListener('message', ({ data }: { data: PortMessage }) => {
      if (data.action === '__debugman_websocket__' && data.data) {
        store.dispatch(websocketAdd(data.data));
      }
    });
  }
}
