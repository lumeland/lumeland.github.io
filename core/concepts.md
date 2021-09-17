---
title: General concepts
description: How Lume works?
order: 1
---

The way Lume works is very simple: it just read files in your `src` directory,
process the content and save the final files into the `dest` folder.

The file extension of the files determine if they are loaded and how to process
them. By default **only the following extensions are enabled**:

| Format                 | Purpose                    |
| ---------------------- | -------------------------- |
| `.md`                  | HTML pages                 |
| `.tmpl.json`           | HTML pages                 |
| `.njk`                 | HTML pages and layouts     |
| `.tmpl.js`, `.tmpl.ts` | HTML pages and layouts     |
| `.yaml`                | HTML pages and shared data |
| `.js`, `.ts`           | Shared data                |
| `.json`                | Shared data                |

This means that files with a different extension will be ignored by Lume. If you
want to use other extensions (like `.css` or `.jpg`), you must enable them. To
do that, there are different choices:

- If you only want to **copy files or folders as they are** without any change,
  the best way is using `site.copy()`.
  [More info about copy static files](../getting-started/config-file.md#copy-static-files).
- If you want to process the content, **they must loaded**
  ([more info about loaders](../core/loaders.md)). There are three types of loaders,
  depending on the purpose of the format:
  - To load files that **generate HTML pages**, use `site.loadPages()`.
  - To load **assets files** (like `.css` or `.js`), use `site.loadAssets()`.
  - To load files with **shared data,** use `site.loadData()`.
- In most cases, **there's a plugin for that,** so see the Plugins section for
  more info.

## Plugins

Everything in Lume is a plugin. Even the support of core formats like `.md`,
`.yaml`, `.json` etc is provided by the following plugins that are enabled by
default:

- [Markdown](markdown.md)
- [JSON](json.md)
- [Modules](modules.md)
- [Nunjucks](nunjucks.md)
- [YAML](yaml.md)

There are a couple of additional plugins to provide common features:

- [Url](url.md)
- [Search](searching.md)
- [Pagination](pagination.md)

Because these plugins are enabled by default, you don't need to import them to
your `_config.js` file. So, if you need to change the configuration of any of
these default plugins, use the second argument of the `lume` function:

```js
import lume from "lume/mod.ts";

// Here are the options to build the site
const siteOptions = {};

// Change the configuration of the core plugins enabled by default
const defaultPluginsOptions = {
  markdown: {}, // Markdown plugin config
  nunjucks: {}, // Nunjucks plugin config
  yaml: {}, // YAML plugin config
};

const site = lume(siteOptions, defaultPluginsOptions);

export default site;
```
