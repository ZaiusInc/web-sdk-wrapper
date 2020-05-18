import type { ZaiusBrowserSdk } from './types';

declare global {
  interface Window {
    zaius: ZaiusBrowserSdk;
  }
}
