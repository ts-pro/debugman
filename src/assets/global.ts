// @ts-expect-error: cant find declaration
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }: { theme: { body: string } }) => theme.body};
    color: ${({ theme }: { theme: { text: string } }) => theme.text};
  }`;
