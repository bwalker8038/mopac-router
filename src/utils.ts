/**
 * Function fires a `routeChange` event to be captured a router instance
 *
 * @param path - the path to be routed to
 */
export function changeRoute(path: string) {
  const pushStateEvent = new CustomEvent("routeChange", {
    detail: path,
  });
  window.dispatchEvent(pushStateEvent);
}
