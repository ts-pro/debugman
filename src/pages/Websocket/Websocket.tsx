import './Websocket.scss';

import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Checkbox, Input, Button } from 'antd';
import { useState, useEffect, useRef } from 'react';

import WebsocketDetails from '@/pages/Websocket/components/WebsocketDetails/WebsocketDetails';
import WebsocketList from '@/pages/Websocket/components/WebsocketList/WebsocketList';
import { hideEmptyFields } from '@/pages/Websocket/helpers/event-list-helpers/event-list-helpers';
import { useAppSelector } from '@/store/hooks/hooks';
import { store } from '@/store/store';
import {
  websocketSetIsEmptyHidden,
  websocketSetIsLogPreserved,
  clearLog,
  WebsocketStateItem,
} from '@/store/websocket-slice/websocket-slice';

export default function Websocket() {
  const { Header, Footer, Sider, Content } = Layout;
  const items = useAppSelector((state) => state.websocket.items);
  const isEmptyHidden = useAppSelector(
    (state) => state.websocket.isEmptyHidden
  );
  const firstRender = useRef(true);
  const selectedItemBuffer = useRef<WebsocketStateItem>();
  const [selectedItem, setSelectedItem] = useState<WebsocketStateItem | null>(
    null
  );
  let websocketMessages: WebsocketStateItem[] =
    resolveMessageContentVisibility(items);

  function showDetails(item: WebsocketStateItem): void {
    websocketMessages.forEach((item: WebsocketStateItem) => {
      if (item.selected) {
        Object.assign(item, { selected: false });
      }
    });
    Object.assign(item, { selected: true });
    setSelectedItem(item);
    selectedItemBuffer.current = item;
  }

  function hideEmptyMessages(): void {
    store.dispatch(websocketSetIsEmptyHidden());
  }

  function preserveLog(): void {
    store.dispatch(websocketSetIsLogPreserved());
  }

  function clearLogPermanently(): void {
    store.dispatch(clearLog({ force: true }));
    setSelectedItem(null);
  }

  function resolveMessageContentVisibility(
    items: WebsocketStateItem[]
  ): WebsocketStateItem[] {
    if (isEmptyHidden) {
      return items.map(hideEmptyFields);
    }

    return items;
  }

  function reselveSelectedMessageContentVisibility() {
    if (selectedItem && isEmptyHidden) {
      const [selected] = resolveMessageContentVisibility([
        selectedItemBuffer.current as WebsocketStateItem,
      ]);

      setSelectedItem(selected);
    } else {
      setSelectedItem(selectedItemBuffer.current as WebsocketStateItem);
    }
  }

  useEffect((): void => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    reselveSelectedMessageContentVisibility();
    websocketMessages = resolveMessageContentVisibility(items);
  }, [isEmptyHidden]);

  return (
    <Layout className="websocket">
      <Header className="websocket__header">
        <Checkbox className="websocket__preserve" onClick={preserveLog}>
          Preserve log
        </Checkbox>
        <Checkbox className="websocket__hide" onClick={hideEmptyMessages}>
          Hide empty
        </Checkbox>
        <Input
          className="websocket__input"
          placeholder="Search by event name"
          prefix={<SearchOutlined />}
        />
        <Button
          className="websocket__clear"
          type="primary"
          shape="circle"
          icon={<ClearOutlined />}
          onClick={clearLogPermanently}
        />
      </Header>
      <Layout>
        <Sider className="websocket__aside">
          <WebsocketList items={websocketMessages} showDetails={showDetails} />
        </Sider>
        <Content>
          <WebsocketDetails item={selectedItem} />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}
