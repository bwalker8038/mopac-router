import { changeRoute } from "../utils";

describe("Utils", () => {
  describe("Utils -> changeRoute", () => {
    it("fires a `changeRoute` event", () => {
      const PATH = "/foo/bar";
      const handler = jest.fn();

      window.addEventListener("routeChange", (e) =>
        handler((e as CustomEvent).detail)
      );

      changeRoute(PATH);

      expect(handler).toBeCalledWith(PATH);
    });
  });
});
