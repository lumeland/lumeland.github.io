---
title: Attributes
description: To manage attributes and class names of HTML elements
---

The Attributes plugin is enabled by default and register two filters to
normalize the attributes of your HTML:

## attr

Provide a convenient way to work with HTML attributes.

```html
---
link:
  title: Go to Github
  href: https://github.com
  target: _blank
---

<a {{ link | attr | safe }}>
```

You can also filter the attributes names:

```html
---
link:
  text: Go to Github
  href: https://github.com
  target: _blank
  noopen: true
  class:
    - link
    - link-external
---

<a {{ link | attr('href', 'target', 'noopen', 'class') | safe }}>
  {{ link.text }}
</a>
```

## class

To work with HTML class names:

```html
---
styles:
  - btn
  - btn-primary
---

<a class="{{ styles | class }}">
```

You can use objects to enable/disable classes:

```html
---
styles:
  btn: true
  btn-primary: true
  is-disabled: false
---

<a class="{{ styles | class }}">
```
