---
title: Other plugins
description: Experimental plugins for Lume
order: 2
---

In addition to built in plugins,
[there's a repository with other experimental plugins](https://github.com/lumeland/experimental-plugins)
that can be added to Lume repository at some point, when they are more mature.
This collection of plugins include features like **Windi CSS** integration,
support for **SASS**, HTML/CSS minifier or integration with **esbuild** bundler.

Due they are experimental plugins, they are not published in `deno.land/x` but
you can use it (at your own risk) importing directly the GitHub file:

```js
import lume from "lume/mod.ts";
import esbuild from "https://raw.githubusercontent.com/lumeland/experimental-plugins/main/esbuild/esbuild.ts";

const site = lume();

// Enable the esbuild plugin
site.use(esbuild());

export default site;
```

## Have you created a plugin for Lume?

Please let me know and I'll include here.
