import { Menu } from 'antd';
import React from 'react';

import { WebsocketStateItem } from '@/store/websocket-slice/websocket-slice';

type Props = {
  items: WebsocketStateItem[] | undefined;
  showDetails: (item: WebsocketStateItem) => void;
};

const WebsocketList: React.FC<Props> = ({ items, showDetails }) => {
  const rows: JSX.Element[] | undefined = items?.map((item, index) => (
    <Menu.Item
      key={index}
      onClick={() => {
        showDetails(item);
      }}
    >
      {Object.keys(item)[0]}
    </Menu.Item>
  ));

  return <Menu theme="dark">{rows ?? []}</Menu>;
};

export default WebsocketList;
