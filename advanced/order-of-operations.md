---
title: Order of operations
description: How Lume works internally
---

This is a high level description of how Lume build your site. When you run
`lume`, the following operations are executed in this order:

1. Dispatch the [event](/advanced/events/) `beforeBuild`.
2. Ensure the `dest` folder is empty.
3. Copy all files and folders configured with
   [`site.copy()`](/getting-started/config-file/#copy-static-files) to the
   `dest` folder.
4. Walk the `src` folder recursively and load all files matching with a valid
   file extension, like `.md`, `.njk`, etc.
   - Skip files and folders starting with `_`, `.` or ignored with
     `site.ignore()`.
   - If the name of the file is `_data` or is inside a `_data` folder, is shared
     data.
   - Otherwise, it's a page.
5. Group all pages by [`renderOrder` value](/advanced/render-order/) and sort
   them.
6. For each group of pages with the same `renderOrder`:
   - If the page content is a generator, generate all the sub-pages.
   - Calculate the [final url](/creating-pages/urls/).
   - Run the [preprocessors](/advanced/processors/#preprocess) registered.
   - Render the page using the assigned
     [template engine](/advanced/multiple-template-engines/) and
     [layout](/creating-pages/layouts/).
7. Dispatch the [event](/advanced/events/) `afterRender`.
8. Run the [processors](/advanced/processors/) registered
9. Dispatch the [event](/advanced/events/) `beforeSave`.
10. Save all pages to `dest` folder.
11. Dispatch the [event](/advanced/events/) `afterBuild`.

## Watch mode

In watch mode (with `lume --serve` or `lume --watch`), the first build is
exactly the same, but the succesive changes have some differences:

- The `dest` folder is not emptied.
- Only the files with changes are loaded.
- The steps 5 to 9 are exactly the same. All pages (not only the modified) are
  rendered. This is because a change in one file can affect to many pages, so we
  have to render all pages again.
- Only the pages with changes in the final content are saved in `dest`.
