---
title: Configuration
description: Configuring Lume
---

**Lume** processes files based on the file extension. Which file extensions are
processed how is determined by tying the extensions to **template engines** or
**processors**. Some extensions are enabled by default, for example **Markdown**
(`*.md`) or **Nunjucks** (`*.njk` or `*.html`). This means that all `*.md`,
`*.njk` and `*.html` files will be loaded, processed and saved as `*.html`
files.

You can customize this by adding a `_config.js` file, which adds to or overrides
the default options; for example, to use a different template engine or to
process different file types with other extensions. Although you can code this
in the config file, for convenience, **Lume** includes **plugins** for common
transformations, such as Markdown and Nunjucks.

The config file must be placed in the site's root directory, which you can
create yourself or with the following command:

```sh
lume init
```

The `_config.js` file is a JavaScript module that exports a Lume instance. The
minimal required code is:

```js
import lume from "lume/mod.js";

const site = lume();

export default site;
```

You can pass an object with configuration data to your site. This is an example
with the default values:

```js
import lume from "lume/mod.js";

const site = lume({
  // The "src" and "dest" directories are relative to this path.
  cwd: Deno.cwd(),

  // The source directory of your site.
  // You can override the value from the CLI with `--src=new-value`.
  src: ".",

  // The output destination of the site.
  // You can override the value from the CLI with `--dest=new-value`.
  // This directory will be cleared before building.
  dest: "_site",

  // The base location where the site will be published.
  // Useful to generate absolute URLs or if your site is published in a subdirectory.
  // For example: https://username.github.io/project-name/
  // You can override the value from the CLI with `--location=new-value`.
  location: new URL("http://localhost"),

  // Set `true` to build the site in development mode.
  // You can override the value from the CLI with `--dev`.
  dev: false

  // To generate pretty URLs, for example `/about-us/` instead of `/about-us.html`.
  // Set `false` to disable it.
  prettyUrls: true,

  // To automatically slugify all URLs.
  // For example, the file `/About Us.md` is converted to `/about-us/` instead of `/About Us/`.
  // Set `false` to disable it.
  slugifyUrls: {
    lowercase: true,
    alphanumeric: true,
    separator: "-",
    replace: {
      "Ð": "D", // eth
      "ð": "d",
      "Đ": "D", // crossed D
      "đ": "d",
      "ø": "o",
      "ß": "ss",
      "æ": "ae",
      "œ": "oe",
    },
  },

  // Local server configuration
  server: {
    // You can override the value from the CLI with `--port`.
    port: 3000,

    // The HTML page to display for 404 errors.
    // You can use, for example, "/index.html" if you are building a web app with dynamic URLs.
    page404: "/404.html",

    // To automatically open the site in the browser.
    open: false,
  }
});

export default site;
```

## Installing plugins

As stated above, plugins add extra functionality or support for new formats.
There are some basic plugins installed by default (like support for `markdown`,
`yaml` or `json` formats), but there are other plugins that you can enable. For
example, to add the `svg` plugin (that optimizes SVG files), you have to import
the plugin and enable it with `use()` in the config file:

```js
import lume from "lume/mod.js";
import svg from "lume/plugins/svg.js";

const site = lume();

// Add svg plugin
site.use(svg());

export default site;
```

## Copy static files

Static files are files that don't have to be processed, like images, PDFs,
videos or audios. So it's better (and faster) to copy these files directly to
dest directory with the `copy` method:

```js
// Copy the "img" directory to _site/img
site.copy("img");

// Copy the file to _site/favicon.ico
site.copy("favicon.ico");
```

The path is relative to the root of the source directory and the files and
directories are copied as is, maintaining the same directory structure. If you
want to change the output directory, use the second parameter:

```js
// Copy the "img" directory to _site/images
site.copy("img", "images");

// Copy the "static-files/favicons/favicon.ico" to _site/favicon.ico
site.copy("static-files/favicons/favicon.ico", "favicon.ico");
```

## Ignore files and directories

By default, all files and directories starting with `.` or `_` are ignored. You
can add more by using the `ignore()` method:

```js
site.ignore("README.md", "CHANGELOG.md", "node_modules");
```

Note: the `node_modules` directory is ignored by default too.

## Template filters

Template filters are functions that you can use in your layouts to modify
content. Some template engines, like Nunjucks,
[have several builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters),
but you can add your own:

```js
// Filter to convert a string to uppercase
site.filter("uppercase", (value) => value.toUpperCase());
```

Now, use it in your Nunjucks templates:

```html
<h1>{{ title | uppercase }}</h1>
```

If your filter is asynchronous, set `true` as the third argument:

```js
site.filter("async_filter", async (value) => value, true);
```

Note that not all template engines support async filters.
