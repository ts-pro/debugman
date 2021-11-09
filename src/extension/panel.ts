import { PortMessage, PortName } from './types/types';

const PORT_NAME: PortName = 'devtools';

export function initPanel() {
  const port = chrome.runtime.connect({
    name: PORT_NAME,
  });

  port.postMessage({
    action: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId,
  } as PortMessage);

  const messagesEl = document.getElementById('messages');
  port.onMessage.addListener(async function (message) {
    if (messagesEl) {
      const content = document.createTextNode(JSON.stringify(message));
      messagesEl.appendChild(content);
      messagesEl.appendChild(document.createElement('br'));
    }
  });
}
