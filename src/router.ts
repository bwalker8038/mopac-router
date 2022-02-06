import { Route } from "./route";

export interface Router {
  routes: Route[];
  currentLocation: string;

  start: () => void;
  route: (path: string, handler: (props: unknown) => void) => void;
}

export class HistoryRouter implements Router {
  public routes: Route[] = [];

  /**
   * Method setups the router and event listeners
   */
  public start() {
    // if the router is already started, abort
    if (this._isStarted) return;

    this._isStarted = true;

    this._navigate(this.currentLocation, true);

    window.addEventListener("routeChange", (e) => {
      this._navigate((e as CustomEvent).detail);
    });

    window.addEventListener("popstate", () => {
      this._popState();
    });
  }

  /**
   * Method adds a route to the router
   *
   * @param path - the new route's path
   * @param handler - the new route's handler to be fired on a match
   */
  public route(path: string, handler: (props: unknown) => void) {
    const route = new Route(path, handler);
    this.routes.push(route);
  }

  /**
   * Flag to prevent multiple start calls
   */
  private _isStarted = false;

  /**
   * Method navigates to a new path
   *
   * @param path - the path to navigate to
   * @param isRouterStart - flag to prevent multiple pushState events on first boot
   */
  private _navigate(path: string, isRouterStart = false) {
    const route = this._lookupRoute(path);

    if (!isRouterStart) history.pushState({}, "", path);

    route.renderView();
  }

  /**
   * Method handles popstate events
   */
  private _popState() {
    const path = this.currentLocation;
    const route = this._lookupRoute(path);

    route.renderView();
  }

  /**
   * Method looks up a passed path and returns the matching route
   *
   * @param  path - the path to match
   */
  private _lookupRoute(path: string) {
    const [route] = this.routes.filter((route) => route.match(path));

    if (!route) throw new Error(`No route found for ${path}`);

    return route;
  }

  get currentLocation() {
    return `${window.location.pathname}${window.location.hash}`;
  }
}
