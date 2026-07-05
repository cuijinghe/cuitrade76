try {
  let _fetch = window.fetch || globalThis.fetch;
  const defineFetch = function(obj: any) {
    try {
      Object.defineProperty(obj, 'fetch', {
        get: function() { return _fetch; },
        set: function(val) { _fetch = val; },
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      console.warn('Failed to define fetch on', obj, e);
    }
  };
  defineFetch(window);
  defineFetch(globalThis);
  if (typeof Window !== 'undefined' && Window.prototype) {
    defineFetch(Window.prototype);
  }
} catch (e) {
  console.warn('Failed to patch fetch:', e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
