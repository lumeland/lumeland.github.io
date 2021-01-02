---
title: CSS
---

The CSS plugin **is disabled by default** so to enable it you have to import and use it in the `_config.js` file:

```js
import css from "https://deno.land/x/lume/plugins/css.js";
  
site.use(css());
```

This plugin loads CSS files and use [PostCSS](https://postcss.org/) with [postcss-import](https://github.com/postcss/postcss-deno-import) and [postcss-nesting](https://github.com/lumeland/postcss-nesting) to bundle css. It also resolves the local `@imports` looking in the `_includes` folder.

```css
/* Import the css file from _includes/css/reset.css */
@import "css/reset.css";

/* Import the relative css file */
@import "./variables.css";
```

You can configure this plugins with the following options:

- `postcssPlugins`: Array with the PostCSS plugins that you want to use
- `map`: Set `true` to generate a source map file that will be saved in the same place but with the `.map` extension appended. For example, the file `my/styles.css` will generate the sourcemap file `my/styles.css.map`.

```js
import css from "https://deno.land/x/lume/plugins/css.js";
import autoprefixer from "https://esm.sh/autoprefixer";
import csso from "https://esm.sh/postcss-csso";

site.use(css({
  postcssPlugins: [ autoprefixer(), csso() ],
  map: true
}));
```

**Note:** [postcss-import](https://github.com/postcss/postcss-deno-import) plugin is executed always, even if it's not included in `postcssPlugins`.
