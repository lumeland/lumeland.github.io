---
title: URL
description: For URL normalization
---

The URL plugin is enabled by default and register two filters to normalize the
URLs in your pages:

## url

The filter `url` normalize a single path with the location value that you have
configured in `_config.js`. It's useful if your site is in a subdirectory or you
want to generate absolute URLs.

```html
<a href="{{ '/about-us' | url }}">

<!-- Full URL -->
<a href="{{ '/about-us' | url(true) }}">
```

Use the character `~` to use the source file name instead of the final URL. The
plugin automatically will detect the final URL for you. This is useful for
dynamic URLs and updating automatically all links to one page when the URL of
this page changes. For example:

```html
<a href="{{ '~/about-us.md' | url }}">

<!-- Will be converted to -->
<a href="/about-us/">
```

## htmlUrl

This filter is similar to `url` but it works with HTML code: it search and
normalize all URLs found in `href` and `src` attributes:

```yml
---
text: 'Go to <a href="/">Homepage</a>'
---
<div>{{ text | htmlUrl | safe }}</div>
```
