/*
 * Copyright 2020-2025, Optimizely, Inc. and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ZaiusBrowserSdk } from './types';

/**
 * @typedef InitializationOptions
 * @type {object}
 * @property {string} trackerId - The trackerId for the account
 * @property {string} [zaiusJsUrl=d1igp3oop3iho5.cloudfront.net/v2] - The URL to load the Zaius Javascript from
 * @property {string} [zaiusJsName=zaius.min.js] - The name of the Zaius JS to load (zaius.min.js/zaius.js generally)
 */
interface InitializationOptions {
  trackerId: string;
  jsUrl?: string;
  jsName?: 'zaius.js' | string;
}

type ZaiusMethods =
  | 'initialize'
  | 'onload'
  | 'event'
  | 'subscribe'
  | 'unsubscribe'
  | 'consent'
  | 'customer'
  | 'entity'
  | 'identify'
  | 'anonymize'
  | 'dispatch';

interface Zaius extends ZaiusBrowserSdk {
  initialize: typeof initialize;
}

const METHODS: ZaiusMethods[] = [
  'initialize',
  'onload',
  'event',
  'subscribe',
  'unsubscribe',
  'consent',
  'customer',
  'entity',
  'identify',
  'anonymize',
  'dispatch',
];

const zaiusProxies: Partial<Zaius> = {} as any;

const zaiusDeferred: Partial<ZaiusBrowserSdk> = [] as any;

METHODS.forEach((method) => {
  (zaiusProxies as any)[method] = (...args: any[]) => {
    ((window.zaius as any)[method] as any)(...args);
  };
  (zaiusDeferred as any)[method] = (...args: any[]) => {
    (window.zaius as unknown as any[]).push([method, ...args]);
  };
});

function initialized() {
  return 'zaius' in window;
}

function setupWindowObject() {
  const zaiusObj: Partial<ZaiusBrowserSdk> = ([] as unknown) as Partial<
    ZaiusBrowserSdk
  >;
  window.zaius = zaiusDeferred as any;
}

/**
 * Initialize the Zaius JavaScript Web SDK
 * @param InitializationOptions - The options to use for the initialization
 */
export function initialize({
  jsName = 'zaius.js',
  jsUrl = 'd1igp3oop3iho5.cloudfront.net/v2',
  trackerId,
}: InitializationOptions) {
  if (initialized()) {
    console.warn('Zaius is already initialized on this page');
    return;
  }
  setupWindowObject();
  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = `${window.location.protocol}//${jsUrl}/${trackerId}/${jsName}`;
  document.head.append(script);
}

zaiusProxies['initialize'] = initialize;

// tslint:disable-next-line: variable-name
export const Zaius = zaiusProxies as Zaius;
