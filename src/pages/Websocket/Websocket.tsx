import './Websocket.css';

import { ChangeEventHandler, useState } from 'react';
import Split from 'react-split';

import NavLayout from '@/components/NavLayout/NavLayout';
import WebsocketDetails from '@/pages/Websocket/components/WebsocketDetails/WebsocketDetails';
import WebsocketList from '@/pages/Websocket/components/WebsocketList/WebsocketList';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  websocketSetIsEmptyHidden,
  WebsocketStateItem,
} from '@/store/websocket-slice/websocket-slice';

export default function Websocket() {
  const items = useAppSelector((state) => state.websocket.items);

  const [selectedItem, setSelectedItem] = useState<WebsocketStateItem | null>(
    null
  );

  const dispatch = useAppDispatch();
  const isEmptyHidden = useAppSelector((state) => {
    return state.websocket.isEmptyHidden;
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(websocketSetIsEmptyHidden(e.target.checked));
  };

  function showDetails(item: WebsocketStateItem) {
    setSelectedItem(item);
  }

  return (
    <NavLayout>
      <label>
        <input type="checkbox" /> - preserve log
      </label>
      |
      <label>
        <input checked={isEmptyHidden} type="checkbox" onChange={onChange} /> -
        hide empty
      </label>
      <hr />
      <Split
        className={'websocket'}
        style={{ display: 'flex', flexDirection: 'row' }}
        sizes={[30, 70]}
        gutterSize={2}
        cursor="ew-resize"
      >
        <WebsocketList items={items} showDetails={showDetails} />
        <WebsocketDetails item={selectedItem} />
      </Split>
    </NavLayout>
  );
}
