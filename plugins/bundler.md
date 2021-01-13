---
title: Bundler
---

The plugin Bundler **is disabled by default** so to enable it you have to import and use it in the `_config.js` file:

```js
import bundler from "https://deno.land/x/lume/plugins/bundler.js";
  
site.use(bundler());
```

This plugin load `.js` and `.ts` files and output a single Javascript file including all dependencies of the input. Internally uses the [bundle](https://deno.land/manual/tools/bundler) Deno tool.

When bundling `.ts` files to run in the browser, use a triple slash reference to include helpful libraries, like `dom` in your scripts. For example, 

```
/// <reference lib="dom" />

document.getElementById("foo");
```

This will help Deno and your code editor to Bundle into JS appropriately. 
