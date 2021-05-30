---
title: Custom processors
description: A guide on extending Lume with custom processors
---

A processor is a function to transform the content of pages and assets. Let's
see an example of a processor to minify HTML pages:

```js
function minifyHTML(page) {
  page.content = minify(page.content);
}
```

If you want to use this processor to build your site, you can register it in the
`_config.js` file:

```js
site.process([".html"], minifyHTML);
```

Now, all HTML pages with be minified.

## Access to page data

As you can see in the previous example, the function receives an object with the
page (or asset). This means that you can access not only to the page content but
to many other data:

```js
function process(page) {
  page.content; // The content of the page
  page.src; // The info about the source file of this page
  page.dest; // The info about the destination of the page
  page.data; // All data available for this page (frontmatter merged with _data)
}
```

For example, let's say you only want to minify the pages with the value `minify`
as `true`:

```js
function minifyHTML(page) {
  if (page.data.minify) {
    page.content = minify(page.content);
  }
}
```

Note: processors are executed just after render the page (with a template
engine).

## Process assets

Note that processors only can transform pages or assets that are previously
loaded. So if you want to process some assets (like CSS or JavaScript files),
make sure that they are loaded before. See [Loaders](/advanced/loaders/) for
more information about how to register a new loader. Let's see an example of how
to load and transform JavaScript files:

```js
import lume from "lume/mod.js";
import textLoader from "lume/loaders/text.js";

const site = lume();

// Load JavaScript files as plain text:
site.loadAssets([".js"], textLoader);

// Process the JavaScript files
site.process([".js"], function (page) {
  page.content = myBundler(page.content);

  page.dest.path += ".min"; // Append .min to the filename, so it will be saved as example.min.js
});
```

## Preprocess

Processors are executed just after rendering the pages. If you need to execute a
function before rendering (for example, to configure a custom template engine or
add extra data to some pages), you can use a **preprocessor**. It works exactly
like a processor but is run before rendering.

For example, let's create a preprocessor to include a variable with the source
filename:

```js
site.preprocess(
  [".html"],
  (page) => page.data.filename = page.src.path + page.src.ext,
);
```
