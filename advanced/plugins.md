---
title: Creating plugins
description: Creating plugins to extend Lume
---
Lume is an static site generator that can be extended easily adding more [loaders](/advanced/loaders/), [processors](/advanced/processors/), [engines](advanced/engines/) etc. Plugins provide an easy interface to extend Lume without write too much code in the `_config.js` file.

A plugin is just a function that receives a lume instance in the first argument, in order to configure and register new elements to it.

For example, to register a new template engine, you have to create an instance and decide the extensions to apply, [as you can see in the docs](advanced/engines/):

```js
import CustomEngine from "https://lume.land/x/my-custom-engine/mod.js";

const myEngine = new CustomEngine(site);
site.engine([".me"], myEngine);
```

You can encapsulate this code in a plugin:

```js
import CustomEngine from "https://lume.land/x/my-custom-engine/mod.js";

export default function () {
  return (site) => {
    const myEngine = new CustomEngine(site);

    site.engine([".me"], myEngine);
  };
}
```

So in your `_config.js` you only have to import the plugin and use it:

```js
import myPlugin from "https://lume.land/x/my-lume-plugin/mod.js";

site.use(myPlugin());
```

To pass configuration options to your plugin, just add arguments to the functions returning the plugin. For example, let's say you want to customize the file extensions to apply the template engine:

```js
import CustomEngine from "https://lume.land/x/my-custom-engine/mod.js";

export default function (ext = [".me"]) {
  return (site) => {
    const myEngine = new CustomEngine(site);

    site.engine(ext, myEngine);
  };
}
```

Now, in your `_config.js` file you can customize the extensions:

```js
import myPlugin from "https://lume.land/x/my-lume-plugin/mod.js";

site.use(myPlugin([".me", ".mo"]));
```
