---
title: Date
description: To manipulate date & time values in different locales
docs: plugins/date.ts/~/Options
---

The Date plugin **is disabled by default** so you need to enable it in
`_config.js` file:

```js
import date from "lume/plugins/date.ts";

site.use(date());
```

This plugin register the `date` filter, that allows to manipulate and format a
datetime value in different locales. It uses [date-fns](https://date-fns.org/)
library under the hood.

```html
<time>{{ createdAt | date }}</time>
```

## Formats

By default, the value is formatted to `yyyy-MM-dd` but you can use the first
argument to set a different format. See the
[`date-fms` documentation](https://date-fns.org/v2.22.0/docs/format) for more
info.

```html
<time>{{ createdAt | date('MM/dd/yyyy') }}</time>
```

There are some predefined formats that you can use:

| Name             | Format                     |
| ---------------- | -------------------------- |
| `ATOM`           | `yyyy-MM-dd'T'HH:mm:ssxxx` |
| `DATE`           | `yyyy-MM-dd`               |
| `DATETIME`       | `yyyy-MM-dd HH:mm:ss`      |
| `TIME`           | `HH:mm:ss`                 |
| `HUMAN_DATE`     | `PPP`                      |
| `HUMAN_DATETIME` | `PPPppp`                   |

```html
<time datetime="{{ createdAt | date }}">
  {{ createdAt | date('HUMAN_DATE') }}
</time>
```

On register the value you can edit or add more formats under a name, so it's
more easy to apply them in the templates:

```js
import date from "lume/plugins/date.ts";

site.use(date({
  formats: {
    "MY_FORMAT": "MM-dd-yyyy",
  },
}));
```

Now you can use this format by its name:

```html
<time>{{ createdAt | date('MY_FORMAT') }}</time>
```

## Locales

`date-fns` has support for
[multiple locales](https://deno.land/x/date_fns@v2.22.1/locale). If you want to
use them, just import and register them in `_config.js`:

```js
import date from "lume/plugins/date.ts";
import gl from "https://deno.land/x/date_fns@v2.22.1/locale/gl/index.js";
import es from "https://deno.land/x/date_fns@v2.22.1/locale/es/index.js";

site.use(date({
  locales: { gl, es },
}));
```

Use the second argument to set the locale:

```html
<time datetime="{{ createdAt | date }}">
  {{ createdAt | date('HUMAN_DATE', 'gl') }}
</time>
```

**Note:** The first locale set in the `_config.js` will be used also as the
default locale.
