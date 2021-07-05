import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import postcss from "lume/plugins/postcss.ts";
import basePath from "lume/plugins/base_path.ts";
import anchor from "https://jspm.dev/markdown-it-anchor@8.0.0";

const site = lume({
  location: new URL("https://lumeland.github.io"),
}, {
  markdown: {
    plugins: [
      [anchor, { permalink: anchor.permalink.headerLink() }],
    ],
  },
});

const response = await fetch("https://cdn.deno.land/lume/meta/versions.json");
const versions = await response.json();

site.data("lastVersion", versions.latest);

site.ignore("README.md");
site.copy("js");
site.copy("logo.svg");
site.copy("lume.png");
site.copy("favicon.ico");
site.copy("favicon-32x32.png");
site.use(postcss());
site.use(codeHighlight());
site.use(basePath());

site.preprocess([".html"], (page) => {
  page.data.sourceFile = page.src.path + page.src.ext;
});

export default site;
