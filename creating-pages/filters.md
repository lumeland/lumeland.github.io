---
title: Filters
description: Adding filters in the config file
---

Filters are functions that can be applied to variables to transform content.
Nunjucks template engine
[has some builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters),
for example:

```html
<h1>{{ 'Welcome' | upper }}</h1>
```

Output:

```html
<h1>WELCOME</h1>
```

Lume allows to create your own filters to be used by all template engines. New
filters must be registered in the `_config.js` file:

```js
// Filter to prepend a 👍 to any text
site.filter("thumbsUp", (value) => "👍 " + value);
```

Now this filter is available in your layouts:

```html
<h1>{{ 'Welcome' | upper | thumbsUp }}</h1>
```

Output:

```html
<h1>👍 WELCOME</h1>
```

## Builtin filters

Lume includes the following convenient preinstalled filters:

- **md**: It's installed by the `markdown` plugin and allows to render Markdown
  content to HTML. [More info](plugins/markdown)
- **njk**: It's installed by the `nunjucks` plugin and allows to render Nunjucks
  content to HTML. [More info](plugins/nunjucks)
- **url / htmlUrl**: It's installed by the `url` plugin and allows to normalize
  URLs. [More info](plugins/url)
- **attr / class**: It's installed by the `attributes` plugin and allows to work
  with HTML attributes. [More info](plugins/attributes)

## Using the filters in JavaScript modules

If you're using JavaScript/TypeScript modules instead a template engine like
Nunjucks, filters are passed as the second argument of your default exported
function:

```js
export default function (data, filters) {
  return `<a href="${filters.url("/about-us")}">About us</a>`;
}
```
