---
title: Command line usage
description: Using Lume on the command line
---

These examples assume that you have installed lume as the `lume` executable:

```sh
# Show the version
lume --version # or -v

# Show help information
lume --help # or -h

# Show help information for the build command
lume build --help

# Create a _config.js file
lume init

# Build the site in the current directory
lume # or lume build

# Build the site overriding some config values
lume --src=from --dest=build --location=https://my-site.com/blog/

# Build the site located in a different directory
lume ./my-site

# Build the site and boot up a web server
# that refresh automatically for every change
lume --serve

# Change the web server port to localhost:8000
lume --serve --port=8000

# Build in development mode to view draft pages
lume --dev

# Pass additional flags to your site code
lume -- flag1 flag2

# Run a custom script
lume run gzip
```
