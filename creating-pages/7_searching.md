---
title: Search and collecting
description: Using the search helper
---

In the layouts, you have the `search` helper that allows to search other pages. It's useful to build menus or other navigation stuff.

## Searching pages

The function `search.pages()` returns an array of pages that you can filter and sort.

To search by tags, just include the tag names as first argument, separated by space. For example, to search all pages containing the tags `post` and `html`, you have to execute `search.pages("post html")`:

```html
<ul>
  {% for post in search.pages("post html") %}
  <li>{{ post.data.title }}</li>
  {% endfor %}
</ul>
```

The second argument is the value used to sort. By default the pages are sorted by `date`, but you can use any field. For example, if you want sort by title:

```html
<ul>
  {% for post in search.pages("post html", "title") %}
  <li>{{ post.data.title }}</li>
  {% endfor %}
</ul>
```

Note: You can use dot notation to sort by any subfield. For example: `header.title`.

### Filtering by a field

You can filter pages not only by tags but also any other field that you want. For example, to search all pages with the value `menu` as `true`, simply include the query `menu=true`:

```html
{% for option in search.pages("menu=true") %}
<a href="{{ option.data.url | url }}">
  {{ option.data.title }}
</a>
{% endfor %}
```

The available operators for the conditions are:

- `=` to search coincidences, for example `menu=true`.
- `!=` to search non-coincidences, for example `menu!=true`.
- `^=` to search values starting with another value. For example all categories starting with the letter `A`: `category^=A`.
- `$=` to search values ending with another value. For example all categories ending with the letter `b`: `category$=b`.

You can use the dot notation and even combine queries with tags. For example, let's say you want to select all pages with the value `taxonomy.category=sport` and with the tag `football`:

```html
{% for post in search.pages("taxonomy.category=sport football") %}
<a href="{{ post.data.url | url }}">
  {{ post.data.title }}
</a>
{% endfor %}
```

In addition to space separated values, you can use an array of values, that sometimes is more practical.

```html
{% for post in search.pages(["taxonomy.category=sport", "football"]) %}
<a href="{{ post.data.url | url }}">
  {{ post.data.title }}
</a>
{% endfor %}
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

## Searching tags

The function `tags` returns the list of all available tags. You can use the first argument to filter the pages of which you want to get the tags. For example, to list all tags used by pages with the category `sport`:

```html
<strong>List of tags in sport:</strong>

<ul>
  {% for tag in search.tags("category=sport") %}
  <li>
    <a href="/tags/{{ tag }}">
      {{ tag }}
    </a>
  </li>
  {% endfor %}
</ul>
```

## Searching data

The function `data` returns the data associated to any file or folder in the source directory. This is useful to get the data stored in any `_data` of any folder. For example:

```html
{{ set companyData = search.data("about/the-company") }}
```