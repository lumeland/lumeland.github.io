---
title: Custom processors
description: A guide on extending Lume with custom processors
---

A processor is a function to transform the content of pages and assets.
Let's see an example of a processor to minify html pages:

```js
function minifyHTML(page) {
  page.content = minify(page.content);
}
```

If you want to use this processor to build your site, you can register it in the `_config.js` file:

```js
site.process([".html"], minifyHTML);
```

Now, all HTML pages with be minified.

## Access to page data

As you can see in the previous example, the function receives an object with the page (or asset). This means that you can access not only to the page content but to many other data:

```js
function process(page) {
  page.content;  // To get/set the content of the page
  page.src;      // To get the info about the source file of this page
  page.dest;     // To get/set the info about the destination of the page
  page.data;     // To get the data of this page (ex: frontmatter)
  page.fullData; // To get the full data of this page (frontmatter merged with _data)
  page.tags;     // To get the tags assigned to the page
}
```

For example, let's say you only want to minify the pages with the value `minify` as `true`:

```js
function minifyHTML(page) {
  if (page.data.minify) {
    page.content = minify(page.content);
  }
}
```

Note: processors are executed just after render the page (with a template engine).

## Process assets

Note that processors only can transform pages or assets that are previously loaded. So if you want to process some assets (like css or javascript files), make sure that they are loaded before. See [Loaders](/advanced/loaders/) for more information about how to register a new loader. Let's see an example of how to load and transform javascript files:

```js
import lume from "https://deno.land/x/lume/mod.js";
import textLoader from "https://deno.land/x/lume/loaders/text.js";

const site = lume();

//Load javascript files as plain text:
site.loadAssets([".js"], textLoader);

//Process the javascript files
site.process([".js"], function (page) {
  page.content = myBundler(page.content);

  page.dest.path += ".min"; //append .min to the filename, so it will saved as example.min.js
})
```
