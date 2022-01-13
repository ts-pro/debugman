// @ts-expect-error: cant find declaration
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .ant-menu.ant-menu-dark {
    background: ${({ theme }: { theme: { aside: string } }) => theme.aside};
  }
  
  .ant-btn {
    background: ${({ theme }: { theme: { button: string } }) => theme.button};
    border-color: ${({ theme }: { theme: { button: string } }) => theme.button};
    color: ${({ theme }: { theme: { buttonText: string } }) =>
      theme.buttonText};
  }
  
  .ant-layout-sider {
    background: ${({ theme }: { theme: { aside: string } }) => theme.aside};
  }
  
  .object-key {
    color: ${({ theme }: { theme: { text: string } }) => theme.text} !important;
  }
  
  .ant-layout-header {
    background: ${({ theme }: { theme: { header: string } }) => theme.header};
  }

  body {
    align-items: center;
    background: ${({ theme }: { theme: { body: string } }) => theme.body};
    color: ${({ theme }: { theme: { text: string } }) => theme.text};
  }`;
