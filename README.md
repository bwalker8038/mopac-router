# Mopac Router

## Description

`mopac-router` is a small, zero-dependency client-side router.

## Installing

`mopac-router` can be installed via `npm` or used through `unpkg`:

via `npm`:

```sh
npm install mopac-router
```

via `unpkg`:

```js
import { HistoryRouter } from "https://unpkg.com/mopac-router?module";
```

### Usage

`mopac-router` is completely framework agnostic and can be dropped into any client-side project.

This package currently does not ship with any framework specific bindings, but some are on the roadmap for future inclusion.

Mopac is Typescript native so typings are included out of the box.

#### Instantiating a router instance

A new `Router` instance can be created by declaring a new `HistoryRouter`.

```js
import { HistoryRouter } from "mopac-router";

const router = new HistoryRouter();
```

#### Declaring routes

Routes are declared though the `router.route` method and accepts two arguments: The route's `path` and a `handler` callback. The handler will fire on a successful `routeChange` event:

```js
router.route("/about", () => {
  console.log("I'm on the about page!");
});
```

#### Dynamic segments

Dynamic segmenting is also supported. The segments are passed to the handler as an object.

```js
router.route("/user/:userId", ({ userId }) => console.log(`hello, ${user}`));
```

Search params can be accessed through the search property on the browser's `Location` object.

#### Starting the router

The router will not start listening for `routeChange` events until `router.start()` has been called. This needs to be done after the routes have been declared. This ensures that if the browser’s current path is a declared route, it’s captured by the router, matched, and fires the corresponding `handler`.

The start method will also setup the `routeChange` and `popstate` .

All this is done through simply calling the `router.start()` method.

#### Navigating routes

A route can be changed through firing a `routeChange` custom event. `mopac-router` ships with a utility function, `changeRoute` that wraps a `routeChange` dispatcher.

```jsx
import { changeRoute } from "mopac-router";

// If using React/Preact...
const Link = ({ to, title, children }) => (
  <a
    href={to}
    title={title}
    onClick={(e) => {
      e.preventDefault();
      changeRoute(to);
    }}
  >
    {children}
  </a>
);
```

#### Example

```jsx
import Preact from "preact";
import { useCallback, useState } from "preact/hooks";
import { HistoryRouter, changeRoute } from "mopac-router";

const router = new Router();

const Link = ({ to, title, children }) => (
  <a
    href={to}
    title={title}
    onClick={(e) => {
      e.preventDefault();
      changeRoute(to);
    }}
  >
    {children}
  </a>
);

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const App = () => {
  const [route, setRoute] = useState(null);

  router.route("/", () => setRoute(Home));
  route.route("/about", () => setRoute(About));

  useEffect(() => {
    router.start();
  }, [route, router]);

  return (
    <>
      <header>
        <nav>
          <Link to="/" title="Home page">
            Home
          </Link>
          <Link to="/about" title="About page">
            About
          </Link>
        </nav>
      </header>
      <main>{route}</main>
    </>
  );
};
```

## Building & Testing

### Building

The package can be built though the `build` script contained in `package.json`:

`npm run build` (or `yarn build`)

The build will be outputted to `dist/` directory.

### Testing

Unit tests can be ran via the `test` script:

`npm run test` (or `yarn test`)
