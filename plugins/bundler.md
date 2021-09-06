---
title: Bundler
description: Enabling the bundler plugin
docs: plugins/bundler.ts
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

You can configure the bundler plugin with the following options:

- `extensions`: Array with the extensions of the files that this plugin will
  handle. By default is `[".js", ".ts"]`. If you want to bundle a `React` app
  you should include also `.jsx` or `.tsx`.
- `sourceMap`: Set `true` to generate a source map file that will be saved in
  the same place but with the `.map` extension appended. For example, the file
  `my/script.js` will generate the sourcemap file `my/script.js.map`.
- `options`: The options available in
  [`Deno.EmitOptions`](https://doc.deno.land/builtin/unstable#Deno.EmitOptions)
- `entries`: Use this option to bundle your scripts and all dependencies to a
  single file. All files, except the ones in this array won't be included in the
  output. To use this option, you must set `options.bundle` to "module" or
  "classic".

## Typescript for the browser

When bundling `.ts` files to run in the browser, use a triple slash reference to
include helpful libraries, like `dom` in your scripts. For example,

```ts
/// <reference lib="dom" />

document.getElementById("foo");
```

This will help Deno and your code editor to Bundle into JS appropriately.
