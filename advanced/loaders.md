---
title: Adding custom loaders
description: Small guide on adding custom loaders to Lume
---

Loaders are functions that read and return the content of files. There are
different loaders for different formats, like `json`, `yaml`, JavaScript modules
or plain text. Creating a custom loader is really easy, you only have to create
a function that reads the content of a file and return an object with that
content.

Let's say you want to add support for `toml` format, using the
[encoding/toml](https://deno.land/std@0.83.0/encoding#toml) Deno std module:

```js
import { parse } from "https://deno.land/std@0.83.0/encoding/toml.ts";

async function tomlLoader(path) {
  const content = await Deno.readTextFile(path);
  return parse(content);
}
```

If you want to use this loader to build your site, just register it in the
`_config.js` file, specifying the file extensions to apply:

```js
site.loadData([".toml"], tomlLoader);
```

Now you can use the TOML format to save data files (`_data.toml` or
`_data/*.toml`).

To use this format to generate pages, use the `loadPages` function:

```js
site.loadPages([".toml"], tomlLoader);
```

Now, any `*.toml` file in your site will be loaded and used to render a page.
For example, the file `/about-us.toml` will be loaded and saved as
`/about-us/index.html` (unless you configure a different name using the `url`
value.

Instead of HTML pages, you may want to use this loader to load toml files and
save them with the same extension (instead of `html`). To do that, you must
register it with `loadAssets`:

```js
site.loadAssets([".toml"], tomlLoader);
```

Now, the `*.toml` files are loaded and saved as `toml`. The function
`loadAssets` is useful to load assets files like `css`, `js`, `svg` that you
want to transform (bundle, minify...) and save them keeping the same extension,
instead of renaming to `html`.

**Note:** you can't use the same extension to generate pages and assets, so a
way to have support for both is adding a subextension (like `tmpl`) for pages.
Example:

```js
//Use *.html.toml extension for pages
site.loadPages([".html.toml"], tomlLoader);

//And any other *.toml files for assets
site.loadAssets([".toml"], tomlLoader);
```

This is the same strategy used for JavaScript/TypeScript modules (`*.tmpl.js`
for pages and `*.js` for JavaScript assets).
