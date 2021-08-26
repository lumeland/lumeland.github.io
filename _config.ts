import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import postcss from "lume/plugins/postcss.ts";
import basePath from "lume/plugins/base_path.ts";
import anchor from "https://jspm.dev/markdown-it-anchor@8.0.0";
import gpm from "https://deno.land/x/gpm@v0.1.0/mod.ts";

const site = lume({
  location: new URL("https://lumeland.github.io"),
}, {
  markdown: {
    plugins: [
      // @ts-ignore: no anchor typings
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
site.copy("deno.svg");
site.copy("lume.png");
site.copy("favicon.ico");
site.copy("favicon-32x32.png");
site.use(postcss());
site.use(codeHighlight());
site.use(basePath());

site.preprocess([".html"], (page) => {
  page.data.sourceFile = page.src.path + page.src.ext;
});

site.addEventListener("beforeBuild", () => {
  return gpm([
    {
      name: "oom-components/page-loader",
      files: ["src"],
    },
    "oom-components/searcher",
  ], "js/vendor");
});

export default site;
