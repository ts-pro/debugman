import { PortMessage, PortName } from './types/types';
import Port = chrome.runtime.Port;

console.log('content-script loaded');

const PORT_NAME: PortName = 'webpage';
let cachedPort: Port | undefined;

// Establish connection with `sw`;
function connect() {
  if (!cachedPort && chrome?.runtime) {
    // @ts-expect-error any
    cachedPort = chrome.runtime.connect(null, { name: PORT_NAME });
    cachedPort.onDisconnect.addListener(() => {
      cachedPort = undefined;
    });
  }

  return cachedPort;
}

// Send message to `sw` -> `devtools`.
function sendMessage(message: PortMessage) {
  const port = connect();
  if (port) {
    port.postMessage(message);
  }
}

// Accept messages from web page.
window.addEventListener('message', (e) => {
  console.log('web-page', e.data);
  const message = e.data as PortMessage;
  if (message?.action) {
    sendMessage(message);
  }
});
