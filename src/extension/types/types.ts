export type PortName = 'webpage' | 'devtools';

export type PortMessageAction = 'websocket' | 'init';
export type PortMessageWrapper<T extends PortMessageAction, U> = {
  [key in keyof U]: U[key];
} & { action: T };

export type PortMessageWebsocket = PortMessageWrapper<
  'websocket',
  {
    itemName: string;
  }
>;

export type PortMessageInit = PortMessageWrapper<
  'init',
  {
    tabId: number;
  }
>;

export type PortMessage = PortMessageWebsocket | PortMessageInit;
