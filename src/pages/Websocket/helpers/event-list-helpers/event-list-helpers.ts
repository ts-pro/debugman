import { WebsocketStateItem } from '@/store/websocket-slice/websocket-slice';

export function hideEmptyFields(item: WebsocketStateItem): WebsocketStateItem {
  return Object.fromEntries(
    // eslint-disable-next-line
    Object.entries(item).filter(([key, value]) => value !== undefined)
  );
}
