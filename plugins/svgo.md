---
title: SVGO
description: Using the SVGO plugin to optimize SVG files
---

The plugin SVG **is disabled by default** so to enable it you have to import and
use it in the `_config.js` file:

```js
import svgo from "lume/plugins/svgo.ts";

site.use(svgo());
```

This plugin load `.svg` files and optimize them using
[SVGO](https://github.com/svg/svgo)
