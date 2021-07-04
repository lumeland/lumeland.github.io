---
title: Bundler
description: Enabling the bundler plugin
---

The plugin Bundler **is disabled by default** so to enable it you have to import
and use it in the `_config.js` file:

```js
import bundler from "lume/plugins/bundler.ts";

site.use(bundler());
```

This plugin load `.js` and `.ts` files and output a single JavaScript file
including all dependencies of the input. Internally uses the
[bundle](https://deno.land/manual/tools/bundler) Deno tool.

When bundling `.ts` files to run in the browser, use a triple slash reference to
include helpful libraries, like `dom` in your scripts. For example,

```ts
/// <reference lib="dom" />

document.getElementById("foo");
```

This will help Deno and your code editor to Bundle into JS appropriately.
