---
title: Command line usage
description: Using Lume on the command line
---

These examples assume that you have installed lume as the `lume` executable:

```sh
# Show the version
lume --version (or -v)

# Show help information
lume --help (or -h)

# Create a _config.js file
lume --init

# Build the site in the current directory
lume

# Build the site overriding some config values
lume --src=from --dest=build --location=https://my-site.com/blog/

# Build the site located in a different directory
lume ./my-site

# Build the site and boot up a web server
# that refresh automatically for every change
lume --serve

# Change the web server port to localhost:8000
lume --serve --port=8000

# Run in development mode
lume --dev

# Pass additional flags
lume -- flag1 flag2

# Run a custom script
lume --run gzip
```
