import { Switch } from 'antd';

import './DarkModeButton.scss';

export function DarkModeButton({
  toggleColorMode,
  theme,
}: {
  toggleColorMode: () => void;
  theme: 'light' | 'dark';
}) {
  return (
    <Switch
      className="dark-mode-button"
      checkedChildren="🌞️"
      unCheckedChildren="🌚"
      checked={theme !== 'dark'}
      onChange={() => toggleColorMode()}
    />
  );
}
