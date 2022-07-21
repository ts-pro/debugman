import React from 'react';
import ReactJson from 'react-json-view';

import './WebsocketDetails.scss';

import { WebsocketStateItem } from '@/store/websocket-slice/websocket-slice';

type Props = {
  item: WebsocketStateItem | null;
};

const WebsocketDetails: React.FC<Props> = ({ item }) => {
  const json = item ? <ReactJson src={item} /> : null;

  return <div className="websocket-details">{json}</div>;
};

export default WebsocketDetails;
