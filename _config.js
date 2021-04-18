import lume from "https://deno.land/x/lume@v0.17.0/mod.js";

const site = lume();

const response = await fetch("https://cdn.deno.land/lume/meta/versions.json");
const versions = await response.json();

site.data("lastVersion", versions.latest);

site.ignore("README.md");
site.copy("js");
site.copy("styles.css");
site.copy("logo.svg");
site.copy("favicon.ico");
site.copy("favicon-32x32.png");

export default site;
