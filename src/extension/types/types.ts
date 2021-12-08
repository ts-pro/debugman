import { WebsocketStateItem } from '@/store/websocket-slice/websocket-slice';

export type PortName = 'webpage' | 'devtools';

export type PortMessageAction = '__debugman_websocket__' | '__debugman_init__';
export type PortMessageWrapper<T extends PortMessageAction, U> = {
  [key in keyof U]: U[key];
} & { action: T };

export type PortMessageWebsocket = PortMessageWrapper<
  '__debugman_websocket__',
  {
    data: WebsocketStateItem;
  }
>;

export type PortMessageInit = PortMessageWrapper<
  '__debugman_init__',
  {
    tabId: number;
  }
>;

export type PortMessage = PortMessageWebsocket | PortMessageInit;
