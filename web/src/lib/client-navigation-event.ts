const NAVIGATION_EVENT_NAME = 'client-navigation';

export type ClientNavigationEvent = CustomEvent<{ pathname: string }>;

export function dispatchClientNavigationEvent(location: Location) {
  const event: ClientNavigationEvent = new CustomEvent(NAVIGATION_EVENT_NAME, {
    detail: { pathname: location.pathname },
  });

  window.dispatchEvent(event);
}

export function addClientNavigationEventListener(listener: (event: ClientNavigationEvent) => void) {
  window.addEventListener(NAVIGATION_EVENT_NAME, listener);
}

declare global {
  interface WindowEventMap {
    'client-navigation': ClientNavigationEvent;
  }
}
