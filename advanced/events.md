---
title: Events
---

Lume has events that you can use to run some code at certain times during the compiling process. You can configure those events in the `_config.js` file with the function `addEventListener`.

## beforeBuild

This event is triggered just before start building the site. It's **executed only once,** even if you build while you are watching the files with `lume --serve`.

```js
site.addEventListener("beforeBuild", () => {
  console.log("The build is about to start");
})
```

## afterBuild

This event is triggered after build the site. It's **executed only once,** even if you build while you are watching the files with `lume --serve`.

```js
site.addEventListener("afterBuild", () => {
  console.log("The build has finished");
})
```

## beforeUpdate

This event is triggered every time a change is detected on build the site with `lume --serve`.

```js
site.addEventListener("beforeUpdate", () => {
  console.log("New changes detected");
})
```

## afterUpdate

This event is triggered after re-build the site after detecting changes with `lume --serve`.

```js
site.addEventListener("afterUpdate", () => {
  console.log("Site updated");
})
```

## Execute scripts with events

In addition to functions, you can also execute [scripts](/advanced/scripts) in events by passing a string with the script name.

```js
//Create the script
site.script("compress", "gzip -r _site site.gz");

//Execute it after build the site
site.addEventListener("afterBuild", "compress").
```
