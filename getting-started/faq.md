---
title: FAQ
description: Frequently Asked Questions
order: 6
---

Solutions to some common Lume problems.

## How to export `.css` files?

- If you want to process the CSS files with postcss, use the
  [postcss plugin](/plugins/postcss).
- To load `.css` files without using postcss, add `site.loadAssets([".css])` to
  your `_config.js` file.

## How to export `.js/.ts` files?

- Use the [bundler plugin](/plugins/bundler) if you want to:
  - Transpile Typescript files to Javascript.
  - Bundle the Javascript to a single file.
- Use the [terser plugin](/plugins/terser) if you want to minify the js code.
- To load `.js` files without using the bundler or terser plugins, add
  `site.loadAssets([".js])` to your `_config.js` file.

## How to export `.svg` files?

- If you want to optimize the svg files, use the [svgo plugin](/plugins/svgo).
- To load `.svg` files without using postcss, add `site.loadAssets([".svg])` to
  your `_config.js` file.

Remember that you can copy files without load them (which is faster) with
[`site.copy()`](/getting-started/config-file/#copy-static-files).

## How to generate non-HTML files?

By default, the files `.md`, `.njk` etc generate files with the `.html`
extension. For example: `/about-me.md` outputs `/about-me/index.html`. If you
want a different extension, you have two options:

- Add a subextension to the file. For example, `styles.css.njk` is a nunjucks
  file that output the file `styles.css`.
- Or include the `url` variable in the front matter or named module.

More info
[in this discussion](https://github.com/lumeland/lume/discussions/113).

## How to insert variables in a markdown file?

Markdown is a format that simply parse and output html, but it doesn't have any
way to insert dynamic variables. To do that, you must combine markdown with any
other template engine that suppport variables, for example Nunjucks.

This is an example of a markdown file that use Nunjucks to insert variables and
markdown to parse and output the final html code:

```
---
title: My post
templateEngine: njk,md
---

# Hello, this is the post title {{ title }}
```

More info
[about configure multiple template engines](/core/multiple-template-engines/).
