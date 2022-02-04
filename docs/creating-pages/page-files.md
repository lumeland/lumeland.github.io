---
title: Page files
description: How Lume will output files based on the sites file structure
order: 1
---

Pages are the files that are loaded, processed and saved in your site. You can
create pages using different formats (`md`, `js`, `ts`, `jsx`, `tsx`, `yml`,
etc) but the simplest way is by adding a Markdown file in the root directory
with a suitable filename and `.md` as extension. Lume will load these files and
generate HTML pages with them:

```txt
.
├── index.md     => /index.html
├── about.md     => /about/index.html
└── contact.md   => /contact/index.html
```

You can organize the pages into subdirectories, and this structure will be used
also in the output of the site build:

```txt
.
├── index.md        => /index.html
└── documentation
    └── doc1.md     => /documentation/doc1/index.html
    └── doc2.md     => /documentation/doc2/index.html
```

## Pretty URLs

By default, all HTML pages will generate _pretty URLs_ (URLs without the `.html`
extension). This means that, instead of `/about-us.html`, the URL is
`/about-us/`. This is done by saving all files as `index.html` and create all
directories as needed.

If you want to disable it, set `prettyUrls` to `false` in
[config file](../getting-started/config-file.md), so you will have something
like this:

```txt
.
├── index.md        => /index.html
└── documentation
    └── doc1.md     => /documentation/doc1.html
    └── doc2.md     => /documentation/doc2.html
```

## Page order

Pages are ordered by date, using the file creation date as default. If you want
to have full control over this, you can assign the data by prepending it to the
filename using the `yyyy-mm-dd` syntax following by an underscore `_` (or
`yyyy-mm-dd-hh-ii-ss` if you need also the time). Note that this part is removed
to generate the final name:

```txt
.
├── index.md                          => /index.html
└── posts
    └── 2020-06-21_hello-world.md     => /posts/hello-world/index.html
    └── 2020-06-22_my-second-post.md  => /posts/my-second-post/index.html
```

If you don't mind the exact date, only want to keep an order, you can use just
numbers:

```txt
.
├── index.md                   => /index.html
└── docs
    └── 1_getting-started.md   => /docs/getting-started/index.html
    └── 2_installation.md      => /docs/installation/index.html
    └── 3_downloads.md         => /docs/downloads/index.html
```

## Ignored pages

All files or directories starting with `_` are ignored by **lume** to generate
pages. This convention allows to place stuff that you don't want to include in
your site output. This is the reason why the config file is `_config.js`, the
output directory is `_site`, the includes directory is `_includes`, or shared
data is named `_data`, all these things starts with an underscore so they are
ignored on loading page files.

Dot files and directories (such as `.git`, `.gitignore`, etc) are also ignored.

## Changing the output URL

You might want to have a particular directory structure for your source files
that is different for the built site. With the `url` variable you change the
output filename of any page (see [Page data](../creating-pages/page-data.md))
