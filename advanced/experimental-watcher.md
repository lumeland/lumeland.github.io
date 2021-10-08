---
title: Experimental watcher
description: A new watcher with support for ESM reloading
---

Starting from `v.1.1.1`, lume includes a new experimental watcher, enabled with the `--experimental` option (`lume --serve --experimental` or `lume --watch --experimental`).

## The problem to solve

Let's say we want to create a page using a [Javascript file](../core/modules.md):

```js
// hello-world.js

export default function () {
  return `
    <h1>Hello world</h1>
    This is the page content
    `;
}
```

In Javascript, modules are inmutable. This means that the modules are cached the first time and subsequent imports will return the cached value. This makes impossible to do real "hot module reloading" of a module.

To emulate that, Lume imports the modules adding a hash at the end of the filename. In this example, instead of import the file with `import("hello-world.js")`, it does something like `import("hello-world.js#random-hash")` creating unique urls. So, if the file need to be reloaded, just import it using a different hash suffix and that's all.

This technique works fine with direct imports, but not with dependencies of this import. Let's see the same example but with adding a dependency:

```js
// hello-world.js
import hello from "./components/hello.js";

export default function () {
  return `
    <h1>${hello("world")}</h1>
    This is the page content
    `;
}
```

Now this page has a dependency stored in `./components/hello.js`. If this component changes, this technique cannot reload the module, because the url used to import the component doesn't change, so the module always will return the cached exported values.

There are some issues in Deno to provide a good way to hot reloading a module, like [a proposal for a Module Loader API](https://github.com/denoland/deno/issues/8327) or an [API for compilers](https://github.com/denoland/deno/issues/1739) but there isn't anything decided yet and seems like these proposals will take a lot of time before being implemented.

## The new watcher

The new experimental watcher has a different approach: It builds/update the site inside a Worker, providing a isolated environment to build the site. If a change to any js/ts module is detected, it terminates the worker and start a new one, so all modules are reloaded again. This is the safest way to perform hot module reloading right now in Deno, but there are some drawbacks, and this is the reason of why this new method is still in experimental mode:

- Import maps don't work with Workers [see issue](https://github.com/denoland/deno/issues/6675). This means that in `_config.js` file Lume must be imported using full urls instead bare imports:

  This will fail:
  ```js
  import lume from "lume/mod.ts";
  ```

  This works:
  ```js
  import lume from "https://deno.land/x/lume@v1.1.1/mod.ts";
  ```

- The whole site is rebuilt after any change in a js/ts file, this could make it slower than simply reload the changed pages.
- Events like `beforeBuild` and `afterBuild` will be executed more than once.
- Modules performing expensive operations like connection to external APIs would be runned several times.

The new watcher should be more smart and try to minify (or remove completely) these drawbacks. This is why this new watch mode is under the `--experimental` flag and is only recommended for sites that depends heavily on Javascript, want hot module reloading and are willing to face these drawbacks.
