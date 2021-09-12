---
title: Markdown
description: Using the Markdown plugin
docs: plugins/markdown.ts
order: 2
---

[Markdown](https://en.wikipedia.org/wiki/Markdown) is a popular markup language
to write content that is converted to HTML. This format is **enabled by
default** and is useful for pages with long text like posts or articles.

## Creating pages in Markdown

To create a page using _Markdown_, just add a file with `.md` extension to your
site. You can also add extra variables by including a _front matter,_ a block
delimited by two triple-dashed lines with YAML code:

```yaml
---
title: Welcome to my page
layout: layouts/main.njk
---

# Welcome

**This is my first post** using lume
I hope you like it!
```

The Markdown code is stored in the `content` variable:

```html
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

## md filter

The Markdown plugin also register the `md` filter that renders any string value
as Markdown and output a HTML. The filter also accepts an argument to render the
Markdown in _inline_ mode.

```html
<!-- Render to HTML code -->
<div>{{ text | md }}<div>

<!-- Single line rendering, without the paragraph wrap: -->
<p>{{ text | md(true) }}<p>
```

## Configure the Markdown plugin

In `_config.ts`, the second argument of `lume()` is used to configure the
plugins that are enabled by default (like this!). Use it to configure the
markdown plugin.

For example, let's use the
[markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) plugin
and change some
[markdown-it settings](https://github.com/markdown-it/markdown-it#usage-examples):

```ts
import anchor from "https://jspm.dev/markdown-it-anchor";

// Markdown plugin configuration
const markdown = {
  plugins: [
    [anchor, { permalink: anchor.permalink.headerLink() }],
  ],
  options: {
    breaks: false,
    xhtmlOut: true,
  },
};

// Apply the plugin config
const site = lume({}, { markdown });
```
