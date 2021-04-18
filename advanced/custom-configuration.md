---
title: Change default configuration
description: Create your own default configuration
---

In the `_config.js` file, the most easy way to setup lume is by using the `mod.js` module in this way:

```js
import lume from "https://deno.land/x/lume/mod.js";

const site = lume();

return site;
```

The function `lume()` creates a `Site` instance with default settings and some plugins configured, like markdown, yaml, nunjucks, etc.

If you want to setup lume from scratch, without this default configuration, you can import only the `Site` class in order to create an empty instance:

```js
import Site from "https://deno.land/x/lume/site.js";

const site = new Site();

//Add stuff to your site here

return site;
```

The `Site` instance is empty, so you have to add any plugin or configure it somehow. For example, if you only need markdown and nunjucks, you could do something like this:

```js
import Site from "https://deno.land/x/lume/site.js";
import markdown from "https://deno.land/x/lume/plugins/markdown.js";
import nunjucks from "https://deno.land/x/lume/plugins/nunjucks.js";

const site = new Site();

return site
  .use(markdown())
  .use(nunjucks())
```
