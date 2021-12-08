import React from 'react';

import { WebsocketStateItem } from '@/store/websocket-slice/websocket-slice';

type Props = {
  items: WebsocketStateItem[];
  showDetails: (item: WebsocketStateItem) => void;
};

const WebsocketList: React.FC<Props> = ({ items, showDetails }) => {
  const rows: JSX.Element[] = items.map((item, index) => (
    <div
      key={index}
      onClick={() => {
        showDetails(item);
      }}
    >
      Websocket message
    </div>
  ));

  return <div>{rows}</div>;
};

export default WebsocketList;
