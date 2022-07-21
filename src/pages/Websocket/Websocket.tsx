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
  const { Header, Sider, Content } = Layout;
  const items = useAppSelector((state) => state.websocket.items);
  const isEmptyHidden = useAppSelector(
    (state) => state.websocket.isEmptyHidden
  );
  const selectedItemBuffer = useRef<WebsocketStateItem>();
  const [selectedItem, setSelectedItem] = useState<WebsocketStateItem | null>(
    null
  );
  const [searchInput, updateSearchInput] = useState('');
  const [websocketMessages, updateWebsocketMessages] = useState<
    WebsocketStateItem[] | undefined
  >();

  function showDetails(item: WebsocketStateItem): void {
    setSelectedItem(item);
    selectedItemBuffer.current = item;
  }

  async function hideEmptyMessages(): Promise<void> {
    await store.dispatch(websocketSetIsEmptyHidden());
  }

  function preserveLog(): void {
    store.dispatch(websocketSetIsLogPreserved());
  }

  function clearLogPermanently(): void {
    store.dispatch(clearLog({ force: true }));
    setSelectedItem(null);
    selectedItemBuffer.current = undefined;
    updateSearchInput('');
  }

  function contentVisibilityFilter(
    items: WebsocketStateItem[]
  ): WebsocketStateItem[] {
    if (isEmptyHidden) {
      return items.map(hideEmptyFields);
    }

    return items;
  }

  function selectedMessageContentVisibilityFilter() {
    if (selectedItem && isEmptyHidden) {
      const [selected] = contentVisibilityFilter([
        selectedItemBuffer.current as WebsocketStateItem,
      ]);

      setSelectedItem(selected);
    } else {
      setSelectedItem(selectedItemBuffer.current as WebsocketStateItem);
    }
  }

  function filterMessages(): void {
    const messages = contentVisibilityFilter(items).filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchInput)
    );
    updateWebsocketMessages(messages);
  }

  useEffect(() => {
    selectedMessageContentVisibilityFilter();
    updateWebsocketMessages(contentVisibilityFilter(items));
  }, [isEmptyHidden]);

  useEffect(() => {
    filterMessages();
  }, [searchInput, items]);

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
          value={searchInput}
          onChange={(event) => updateSearchInput(event.target.value)}
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
    </Layout>
  );
}
