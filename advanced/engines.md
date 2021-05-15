---
title: Template engines
description: Extending Lume to use other template engines
---

Lume supports several template engines to render your pages, like Nunjucks, Pug
or Eta. It's easy to extend this suppoprt for more template engines, you only
need to create a class extending the `TemplateEngine` class. Let's see an
example using [handlebars](https://github.com/handlebars-lang/handlebars.js):

```js
import HandlebarsJS from "https://dev.jspm.io/handlebars@4.7.6";
import TemplateEngine from "https://deno.land/x/lume/engines/templateEngine.js";

class HandlebarsEngine extends TemplateEngine {
  render(content, data, filename) {
    const template = HandlebarsJS.compile(content);
    return template(data);
  }
}
```

To use this template engine to build your pages, just register it in the
`_config.js` file:

```js
import HandlebarsEngine from "./handlebars-engine.js";

site.engine([".hbs"], new HandlebarsEngine(site));
```

Now, all files with the `.hbs` extension will use the Handlebars engine to
render.

**Note:** this is a very basic implementation only for example. You can see the
code of the available template engines in Lume for real examples.
