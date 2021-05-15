---
title: Installation
description: Installing Lume
---

**Lume** requires Deno (v1.10.0 or newer) being installed on your computer. Read
the [Deno installation](https://deno.land/#installation) instructions if you
don't have it yet.

## Install Lume on your computer

The easiest way to install Lume is by executing the following command:

```sh
deno run -A https://deno.land/x/lume/install.js
```

Now you have the `lume` command.\
Once installed, you can update Lume to the latest version by running:

```sh
lume upgrade
```

## Execute it without install

The `ci.js` file works exactly like the `lume` command but without installation.
It's useful for CI environments:

```sh
deno run -A https://deno.land/x/lume/ci.js
```
