import lume from "lume/mod.js";
import codeHighlight from "lume/plugins/code_highlight.js";
import postcss from "lume/plugins/postcss.js";

const site = lume();

const response = await fetch("https://cdn.deno.land/lume/meta/versions.json");
const versions = await response.json();

site.data("lastVersion", versions.latest);

site.ignore("README.md");
site.copy("js");
site.copy("logo.svg");
site.copy("favicon.ico");
site.copy("favicon-32x32.png");
site.use(postcss());
site.use(codeHighlight());

site.preprocess([".html"], (page) => {
  page.data.sourceFile = page.src.path + page.src.ext;
});

export default site;
