import { PortMessage, PortName } from './types/types';

import Port = chrome.runtime.Port;
const ports: Record<number, Record<PortName, Port | undefined>> = {};

function messageListener(message: PortMessage, port: Port): void {
  const tabId =
    message.action === '__debugman_init__'
      ? message.tabId
      : port.sender?.tab?.id ?? -1;
  const fromName = port.name as PortName;
  const toName: PortName = fromName === 'webpage' ? 'devtools' : 'webpage';

  if (!ports[tabId]) {
    ports[tabId] = {
      devtools: undefined,
      webpage: undefined,
    };
  }

  ports[tabId][fromName] = port;
  console.log('MESSAGE', tabId, fromName, message);

  const toPort = ports[tabId][toName];

  if (toPort && toName === 'devtools') {
    toPort.postMessage(message);
  } else {
    console.info(`Port is not ready yet, to: `, toName);
  }
}

// Accept connections from `webpage` & `devtools`.
chrome.runtime.onConnect.addListener((port) => {
  const name = port.name as PortName;

  if (name !== 'webpage' && name !== 'devtools') {
    return;
  }

  // Start listening messages from accepted connection
  port.onMessage.addListener(messageListener);
  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(messageListener);
  });
});
