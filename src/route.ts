export const SEGMENT_MATCHER = /([:*])(\w+)/g;
export const MATCH_QUERY_PARAMS = "(?:/|$)";

type RouteParams = {
  [key: string]: string;
};

export class Route {
  public path: string;

  public handler: (params?: RouteParams) => void;

  public params?: RouteParams;

  public matcher: string;

  private paramNames: string[] = [];

  /**
   * Class represents route
   * @param {string} path - The route's path
   */
  constructor(path: string, handler: (params?: RouteParams) => void) {
    this.path = path;
    this.handler = handler;

    this.matcher = this._initMatcher(path);
  }

  /**
   * Matches a route
   *
   * @param path - the path to match
   */
  public match(path: string) {
    const routeMatch = path.match(new RegExp(this.matcher));

    // if there is no match or the match does not equal the path, abort
    // This is to prevent a match on a path that is a parent of the route
    if (!routeMatch || routeMatch[0] !== path) return false;

    const [, ...matchedParams] = routeMatch;
    const params = matchedParams.reduce((params, value, index) => {
      const name = this.paramNames[index];
      params[name] = value;

      return params;
    }, {} as RouteParams);

    this.setProps(params);

    return true;
  }

  /**
   * Method to set the route's props
   *
   * @param newProps - the new props to set
   */
  public setProps(newParams: RouteParams) {
    this.params = { ...this.params, ...newParams };
  }

  /**
   * Renders a route
   */
  public renderView() {
    return this.handler.call(this, this.params);
  }

  /**
   * Initializes the matcher for the route
   *
   * @param {string} path - the path to match
   */
  private _initMatcher(path: string) {
    const params = path.match(SEGMENT_MATCHER) || [];
    this.paramNames = params.map((s) => s.slice(1));

    const matcher = path.replace(SEGMENT_MATCHER, "([^/]+)");

    return `${matcher}${MATCH_QUERY_PARAMS}`;
  }
}
