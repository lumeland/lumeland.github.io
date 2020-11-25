---
title: Installation
---

**lume** requires Deno installed on your computer. Read [Deno installation](https://deno.land/#installation) instructions if you don't have it yet.

## Execute without install

You can execute **lume** remotely by executing the following command:

```sh
deno run --unstable -A https://deno.land/x/lume/cli.js
```

## Install as executable

But it's easier if you install the script as an executable, by running:

```sh
deno install --unstable -A https://deno.land/x/lume/cli.js
```

Now you have the `lume` command. In the Deno manual you can see more info about [how to install scripts in Deno](https://deno.land/manual/tools/script_installer).

## Update

To update **lume** to the latest version you can execute:

```sh
lume --upgrade
```
