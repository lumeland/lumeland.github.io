---
title: PostCSS
description: Using the PostCSS plugin to transform CSS
---

The `PostCSS` load and transform your css files using [PostCSS](https://postcss.org/) processor. This plugin **is disabled by default** so to enable it you have to import and use it in the `_config.js` file:

```js
import postcss from "https://deno.land/x/lume/plugins/postcss.js";
  
site.use(postcss());
```

By default it uses the following plugins:

- [postcss-import](https://github.com/postcss/postcss-deno-import), to inline the local `@imports` looking in the `_includes` folder.
- [postcss-nesting](https://github.com/lumeland/postcss-nesting) to give support to nested rules

```css
/* Import the css file from _includes/css/reset.css */
@import "css/reset.css";

/* Import the relative css file */
@import "./variables.css";
```

The available options are:

- `plugins`: Array with the PostCSS plugins that you want to use. Your custom plugins will replace the default `postcss-nesting` plugin (but not `postcss-import` that for convenience, it will be used always).
- `sourceMap`: Set `true` to generate a source map file that will be saved in the same place but with the `.map` extension appended. For example, the file `my/styles.css` will generate the sourcemap file `my/styles.css.map`.

```js
import postcss from "https://deno.land/x/lume/plugins/postcss.js";
import autoprefixer from "https://esm.sh/autoprefixer";
import csso from "https://esm.sh/postcss-csso";

site.use(postcss({
  plugins: [ autoprefixer(), csso() ],
  sourceMap: true
}));
```
