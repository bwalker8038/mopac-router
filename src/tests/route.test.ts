import { Route, MATCH_QUERY_PARAMS } from "../route";

describe("Route", () => {
  describe("constructor", () => {
    it("should create a Route instance", () => {
      const PATH = "/foo";
      const handler = jest.fn();
      const route = new Route(PATH, handler);

      expect(route.path).toBe(PATH);
      expect(route.handler).toBe(handler);
      expect(route.matcher).toBe(`${PATH}${MATCH_QUERY_PARAMS}`);
    });
  });

  describe("Route.match", () => {
    it("should return `true` when the passed path matches", () => {
      const PATH = "/foo";
      const handler = jest.fn();
      const route = new Route(PATH, handler);

      expect(route.match(PATH)).toBe(true);
    });

    it("should return `false` when the passed path does not match", () => {
      const PATH = "/foo";
      const PATH_TWO = "/bar";
      const handler = jest.fn();
      const route = new Route(PATH, handler);

      expect(route.match(PATH_TWO)).toBe(false);
    });
  });

  describe("Route.setProps", () => {
    it("should set the route's params", () => {
      const PATH = "/foo";
      const handler = jest.fn();
      const route = new Route(PATH, handler);
      const params = { foo: "bar" };

      route.setProps(params);

      expect(route.params).toEqual(params);
    });
  });

  describe("Route.renderView", () => {
    it("should call the route's handler", () => {
      const PATH = "/foo";
      const handler = jest.fn();
      const route = new Route(PATH, handler);

      const params = { foo: "bar" };

      route.setProps(params);

      route.renderView();

      expect(handler).toHaveBeenCalledWith(params);
    });
  });
});
