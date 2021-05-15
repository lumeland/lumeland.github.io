---
title: PostCSS
description: Using the PostCSS plugin to transform CSS
---

The `PostCSS` plugin load and transform your CSS files using
[PostCSS](https://postcss.org/) processor. This plugin **is disabled by
default** so to enable it you have to import and use it in the `_config.js`
file:

```js
import postcss from "lume/plugins/postcss.js";

site.use(postcss());
```

By default it uses the following plugins:

- [postcss-import](https://deno.land/x/postcss_import), to inline the local
  `@imports` looking in the `_includes` directory.
- [postcss-nesting](https://github.com/lumeland/postcss-nesting) to give support
  to nested rules.
- [postcss_autoprefixer](https://deno.land/x/postcss_autoprefixer) to add
  automatically the vendor prefixes.

```css
/* Import the CSS file from _includes/css/reset.css */
@import "css/reset.css";

/* Import the relative CSS file */
@import "./variables.css";
```

The available options are:

- `extensions`: Array with the extensions of the files that this plugin will
  load. By default is `[".css"]`.
- `plugins`: Array with the PostCSS plugins that you want to use. Your custom
  plugins will replace the default `postcss-nesting` plugin (but not
  `postcss_import` that for convenience, it will be used always, see `includes`
  option below).
- `sourceMap`: Set `true` to generate a source map file that will be saved in
  the same place but with the `.map` extension appended. For example, the file
  `my/styles.css` will generate the sourcemap file `my/styles.css.map`.
- `includes`: An array of directories to search for the `@import`ed files. By
  default is `_includes`. Set `false` to disable it, and hence the
  `postcss_import` plugin.

```js
import postcss from "lume/plugins/postcss.js";
import { autoprefixer } from "lume/deps/postcss.js";
import csso from "https://esm.sh/postcss-csso";

site.use(postcss({
  plugins: [autoprefixer(), csso()],
  sourceMap: true,
}));
```
