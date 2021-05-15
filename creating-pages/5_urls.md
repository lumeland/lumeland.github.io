---
title: URLs
description: How define the output filename
---

As said in [Page files](/creating-pages/page-files), the output filename is
generated using the original source file path:

```
posts/my-first-post.md  =>  /posts/my-first-post/index.html
```

By default, the pages are saved as "pretty URLs", using directories for the path
and a `index.html` file. So the final URL is `/posts/my-fist-post/`. To disable
this behaviour, set the option `prettyUrls` to `false` in your `_config.js` file
(see [Configuration](/getting-started/config-file/)).

```js
const site = lume({
  prettyUrls: false,
});
```

```
posts/my-first-post.md  =>  /posts/my-first-post.html
```

## Slugify

All output paths are **automatically slugified:** the spaces are replaced with
`-`, characters like `ñ` or `á` are replaced by ASCII equivalents (`n` and `a`)
and converted to lower case:

```
posts/My First Post.md  =>  /posts/my-first-post/index.html
```

You can configure the slugifier in your `_config.js` file with the following
options:

```js
const site = lume({
  slugifyUrls: {
    lowercase: true, // Converts all characters to lowercase
    alphanumeric: true, // Replace non alphanumeric characters for the equivalent. Example: ñ to n.
    separator: "-", // Character used as separator for words
    replace: { // An object with individual characters replacements
      "ð": "d",
      "ø": "o",
      "ß": "ss",
      "æ": "ae",
      "œ": "oe",
    },
  },
});
```

Set `false` to disable the slugifier:

```js
const site = lume({
  slugifyUrls: false,
});
```

## The `url` variable

The variable `url` defined in the page allows to customize the output file
individually. For example:

```yml
---
title: My first post
url: /posts/welcome/
---
```

In this example, the `url` value will be used to generate the output file
instead of the filename:

```
posts/my-first-post.md  =>  /posts/welcome/index.html
```

Note that defining manually the URL of a page will makes that `prettyUrls`
option **won't have any effect.** For example:

```yml
# This outputs /posts/welcome/index.html
url: /posts/welcome/

# This outputs /posts/welcome (a file without extension)
url: /posts/welcome

# This outputs /posts/welcome.html
url: /posts/welcome.html
```

The `slugifyUrls` option can modify the `url` value:

```yml
---
title: Teño fame, mamá
url: /Post/Teño fame, mamá/
---
```

The output filename would be `/post/teno-fame-mama/index.html`.

## Relative URLs

If you only want to change the last part of the URL, you can use relative paths.
For example:

```yml
---
title: My fist post
url: ./welcome/
---
```

In this example, the page will be saved using the directory path where the
source file is saved but adding `welcome` in the last part of the URL.

```
posts/my-first-post.md  =>  /posts/welcome/index.html
```

Using `../welcome/` as URL will remove also the last directory.

```
posts/my-first-post.md  =>  /welcome/index.html
```

## URLs as functions

The variable `url` accepts also a function that will be used to generate the
final value. This function will receive the current page as the first argument.

For example, let's say that we want to generate automatically all URLs of our
posts, using the title value. We can create a `_data.js` file in the `/post/`
directory, with the following code:

```js
export function url(page) {
  return `./${page.data.title}/`;
}
```

Now, all pages in the post directory share the same `url` function, that returns
the title of the page as a relative URL, for example `./My first post/` (See
[Shared data](/creating-pages/shared-data/)).

Due the URL is relative, the current directory is appended automatically (it
will be resolved to `/post/My first post/`). And due all output paths are
slugified automatically, the final page will be `/post/my-fist-post/`.

Using functions as URLs gives a lot of flexibility to generate the URLs as you
want.

## Configure individual URLs

You may want to change how the URL is generated for specific pages. To do that,
`url` accepts also an object with different options:

```yml
---
url:
  path: _headers
  slugify: false
---
```

Due the slugifier will remove the character `_`, we wanted to disable it but
only for this specific page. So, instead of a string, we use an object with the
`path` and the `slugify` option set to `false`.

Another example is if we want to disable `prettyUrls` option:

```yml
---
url:
  pretty: false
---
```

Now, the final URL of this page won't be _pretty_. Note that we don't have the
`path` property because the URL is calculated using the source filename.
Remember that on including manually the URL path, the `pretty` option wouldn't
have any effect.

## Combine functions and objects

Combining functions and objects is useful to change the URL generation for a
specific folder. For example, let's say we want to disable the pretty URLs to
all pages in a directory. We only need to create a function in the `_data.js`
file returning an object:

```js
export function url() {
  return {
    pretty: false,
  };
}
```
