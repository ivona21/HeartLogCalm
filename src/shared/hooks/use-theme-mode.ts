import * as React from 'react';

function getSnapshot(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  return document.documentElement.classList.contains('dark');
}

function subscribe(onStoreChange: () => void) {
  if (typeof document === 'undefined') {
    return () => undefined;
  }

  const observer = new MutationObserver(() => {
    onStoreChange();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => observer.disconnect();
}

export function useIsDarkTheme() {
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
