import { Router, HistoryRouter } from "../router";

describe("HistoryRouter", () => {
  describe("constructor", () => {
    it("should create a HistoryRouter instance", () => {
      const router = new HistoryRouter();

      expect(router).toBeInstanceOf(HistoryRouter);
    });
  });

  describe("HistoryRouter.route", () => {
    it("should add a route to the router", () => {
      const router = new HistoryRouter();
      const path = "/foo";
      const handler = jest.fn();

      router.route(path, handler);

      expect(router.routes).toHaveLength(1);
      expect(router.routes[0].path).toBe(path);
      expect(router.routes[0].handler).toBe(handler);
    });
  });

  describe("HistoryRouter.start", () => {
    const PATH_ONE = "/";
    const PATH_TWO = "/foo";
    const PATH_THREE = "/foo/:bar";

    const HANDLER_ONE = jest.fn();
    const HANDLER_TWO = jest.fn();
    const HANDLER_THREE = jest.fn();

    let router: Router;

    beforeEach(() => {
      router = new HistoryRouter();
      router.route(PATH_ONE, HANDLER_ONE);
      router.route(PATH_TWO, HANDLER_TWO);
      router.route(PATH_THREE, HANDLER_THREE);

      router.start();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should not attempt to setup the router more than once", () => {
      router.start();
      expect(HANDLER_ONE).toHaveBeenCalledTimes(1);
    });

    it("should setup the router and event listeners", () => {
      expect(router.currentLocation).toBe(PATH_ONE);
      expect(HANDLER_ONE).toHaveBeenCalledTimes(1);
    });

    it("should navigate to a new route when a `routeChange` event is triggered", () => {
      window.dispatchEvent(
        new CustomEvent("routeChange", { detail: PATH_TWO })
      );

      expect(router.currentLocation).toBe(PATH_TWO);
      expect(HANDLER_TWO).toHaveBeenCalled();
    });

    it("should pass dynamic segments to the route's handler on a successful routeChange", () => {
      const id = "123";

      window.dispatchEvent(
        new CustomEvent("routeChange", { detail: `${PATH_TWO}/${id}` })
      );

      expect(HANDLER_THREE).toHaveBeenCalledWith({ bar: id });
    });
  });
});
