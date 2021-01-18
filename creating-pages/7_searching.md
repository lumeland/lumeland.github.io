---
title: Search and collecting
description: Using the search helper
---

In the layouts, you have the `search` helper that allows to search other pages and directories. It's useful to build menus or other navigation stuff.

## Searching pages

The function `search.pages()` returns an array of pages that you can filter by tags and sort.

To search by tags, just include the tag names as first argument, separated by space. For example, to search all pages containing the tags `post` and `html`, you have to execute `search.pages("post html")`:

```html
<ul>
  {% for post in search.pages("post html") %}
  <li>{{ post.data.title }}</li>
  {% endfor %}
</ul>
```

The second argument is the sort. The available options are:

- `date`: The default value. Sort the pages by date
- `file`: Sort the pages by filename
- Any other value is used to sort by a key with the same name

```html
<ul>
  {% for post in search.pages("post html", "file") %}
  <li>{{ post.data.title }}</li>
  {% endfor %}
</ul>
```

## Searching next and previous page

If the current page belongs to a list of pages (for example, a list of pages under the same tag), you can get the previous and next page in this list. To do that we have the functions `search.previousPage()` and `search.nextPage()`. The syntax is the same as `search.pages()` but the first argument is the url of the current page. Let's see an example:

```html
<h2>More articles tagged as "html"</h2>

{% set post = search.previousPage(url, "html") %}

{% if post %}
  <a href="{{ post.data.url | url }}" rel="prev">← {{ post.data.title }}</a>
{% else %}

{% set post = search.nextPage(url, "html") %}

{% if post %}
  <a href="{{ post.data.url | url }}" rel="next">{{ post.data.title }} →</a>
{% endif %}
```

## Searching folders

The function `folder` returns an object representing a folder. This is useful to get the data associated to that folder (stored in `_data`). For example:

```html
<strong>{{ search.folder("about").data.sectionTitle }}</strong>

<ul>
  {% for post in search.pages("about") %}
  <li>{{ post.data.title }}</li>
  {% endfor %}
</ul>
```

## Searching tags

The function `tags` returns the list of all available tags. You can use the first argument to set a list of tags that you want to avoid. For example, to list all tags excluding `post` and `menu`:

```html
<strong>List of tags:</strong>

<ul>
  {% for tag in search.tags("post menu") %}
  <li>
    <a href="/tags/{{ tag }}">
      {{ tag }}
    </a>
  </li>
  {% endfor %}
</ul>
```