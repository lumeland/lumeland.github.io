import lume from "https://deno.land/x/lume/mod.js";

const site = lume();

site.ignore("README.md");
site.copy("styles.css");
site.copy("lume.png");
site.copy("favicon.ico");
site.copy("favicon-32x32.png");

export default site;
