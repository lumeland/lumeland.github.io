---
title: SVG
description: Using the SVG plugin to optimize SVG files
---

The plugin SVG **is disabled by default** so to enable it you have to import and
use it in the `_config.js` file:

```js
import svg from "lume/plugins/svg.js";

site.use(svg());
```

This plugin load `.svg` files and optimize them using
[SVGO](https://github.com/svg/svgo)
