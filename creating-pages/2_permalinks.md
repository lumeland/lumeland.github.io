---
title: Permalinks
description: How define the output filename
---

As said in [Page files](/creating-pages/page-files), the output filename is generated using the original source file path:

```
posts/my-first-post.md  =>  /posts/my-first-post/index.html
```

By default, the pages are saved as `index.html` files, in order to generate pretty urls. This allows to access to the page with the url `/posts/my-fist-post/`. To disable this behaviour, set the option `prettyUrls` to `false` in your `_config.js` file (see [Configuration](/getting-started/config-file/)).

```
prettyUrls = false;

posts/my-first-post.md  =>  /posts/my-first-post.html
```

## Slugify

All output paths are automatically slugified: the spaces are replaced with `-`, problematic characters are convered to ascii equivalents and converted to lower case:

```
posts/My First Post.md  =>  /posts/my-first-post/index.html
```

## The `permalink` variable

The variable `permalink` defined in the page allows to customize the output file individually. For example:

```yml
---
title: My first post
permalink: /post/welcome
---
```

In this example, the `permalink` value will be used to generate the output file instead the source filename:

```
posts/my-first-post.md  =>  /posts/welcome/index.html
```

The permalink variable is slugified too, so in this example:

```yml
---
title: Teño fame, mamá
permalink: /Post/Teño fame, mamá
---
```

The output filename would be `/post/teno-fame-mama`.

## Relative permalinks

If you only want to change the last part of the permalink, you can use relative paths. For example:

```yml
---
title: My fist post
permalink: ./welcome
---
```

In this example, the page will be saved using the directory path where the source file is saved but adding `welcome` in the last part of the url. 

```
posts/my-first-post.md  =>  /posts/welcome/index.html
```

Using `../welcome` as permalink will remove also the last directory.

```
posts/my-first-post.md  =>  /welcome/index.html
```

## Permalinks as functions

The variable `permalink` accepts also a function that will be used to generate the final value. This function will receive the current page as the first argument.

For example, let's say that we want to generate automatically all permalinks of our posts, using the title value. We can create a `_data.js` file in the `/post/` directory, with the following code:

```js
export function permalink(page) {
  return `./${page.data.title}`
}
```

Now, all pages in the post directory share the same permalink function, that returns the title of the page as a relative permalink, for example `./My first post` (See [Shared data](/creating-pages/shared-data/)).

Due the permalink is relative, the current directory is appended automatically (it will be resolved to `/post/My first post`). And due all output paths are slugified automatically, the final page will be `/post/my-fist-post`.

```
posts/my-first-post.md  =>  /welcome/index.html
```

```
.
└── posts
    └── _data.js
    └── post-1.md     => /posts/my-first-post/index.html
    └── post-2.md     => /posts/my-second-post/index.html
```

Using functions as permalinks gives a lot of flexibility to generate the permalinks as you want.