---
title: Events
description: A list of all the events which Lume will dispatch in the lifecycle
---

Lume has events that you can use to run some code at certain times during the
compiling process. You can configure those events in the `_config.js` file with
the function `addEventListener`.

## beforeBuild

This event is triggered just before the site build starts. Note that if you are
watching the files with `lume --serve`, this is **only executed once** before
the initial build. Use **beforeUpdate** for subsequent changes.

```js
site.addEventListener("beforeBuild", () => {
  console.log("The build is about to start");
});
```

## afterBuild

This event is triggered after build the site. Note that if you are watching the
files with `lume --serve`, this is **only executed once** after the initial
build. Use **afterUpdate** for subsequent changes.

```js
site.addEventListener("afterBuild", () => {
  console.log("The build is finished");
});
```

## beforeUpdate

This event is triggered every time a change is detected on build the site with
`lume --serve`.

```js
site.addEventListener("beforeUpdate", (event) => {
  console.log("New changes detected");
  console.log(event.files); // The files that have changed
});
```

## afterUpdate

This event is triggered after re-build the site after detecting changes with
`lume --serve`.

```js
site.addEventListener("afterUpdate", (event) => {
  console.log("Site updated");
  console.log(event.files); // The files that have changed
});
```

## afterRender

This event is triggered just after all pages are rendered but before process.

```js
site.addEventListener("afterRender", (event) => {
  console.log("All pages rendered");
});
```

## beforeSave

This event is triggered just before saving the generated pages.

```js
site.addEventListener("beforeSave", (event) => {
  console.log("All pages are about to be saved");
});
```

## Execute scripts with events

In addition to functions, you can also execute [scripts](/advanced/scripts) in
events by passing a string with the script name.

```js
// Create the script
site.script("compress", "gzip -r _site site.gz");

// Execute it after build the site
site.addEventListener("afterBuild", "compress").
```
