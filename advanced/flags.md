---
title: Flags
description: The different flags that can be passed to the Lume CLI
---

Flags are arbitrary data that you can pass to lume from the cli. This is useful for configuration or to passing arguments to scripts.
All arguments after `--` are stored in the `site.flags` array:

```
lume -- first-flag second-flag
```

In your `_config.js` file you can get these two values:

```js
console.log(site.flags[0]); // first-flag
console.log(site.flags[1]); // second-flag
```

## Using flags in scripts

Let's say you have a script to deploy your site but you want to configure the server where your site will be uploaded:

```js

const server = site.flags[0] || "server.com";

site.script("deploy", `rsync -r _site/** user@${server}:/var/www/`);
```

Now you can run `lume run deploy` to deploy the site to the default server or `lume run deploy -- other-server.com` to change the server name.

Because flags are stored in `site`, you can use it everywhere, for example in events:

```js
site.addEventListener("afterBuild", () => {
  if (site.flags.includes("compress")) {
    compressImages();
  }
})
```