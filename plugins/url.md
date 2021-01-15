---
title: Url
description: For url normalization
---

The Url plugin is enabled by default and register two filters to normalize the urls in your pages:

## url

The filter `url` normalize a single path with the location value that you have configured in `_config.js`. It's useful if your site is in a subdirectory or you want to generate absolute urls.

```html
<a href="{{ '/about-us' | url }}">

<!-- Full url -->
<a href="{{ '/about-us' | url(true) }}">
```

## htmlUrl

This filter is similar to `url` but it works with html code: it search and normalize all urls found in `href` and `src` attributes:

```yml
---
text: 'Go to <a href="/">Homepage</a>'
---
<div>{{ text | htmlUrl | safe }}</div>
```