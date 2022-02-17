import Searcher from "./vendor/searcher/searcher.js";
import Navigator from "./vendor/page-loader/navigator.js";

customElements.define("lume-search", Searcher);

const menu = document.querySelector(".menu");
const btn = document.querySelector(".menu-button");

btn?.addEventListener("click", (ev) => {
  menu.classList.toggle("is-open");
  ev.stopPropagation();
});

const nav = new Navigator(async (load, event) => {
  const page = await load();

  await page.replaceContent("main");
  await page.replaceContent("footer");
  await page.updateState();
  await page.resetScroll();

  menu.querySelectorAll('a[aria-current="page"]').forEach((link) =>
    link.removeAttribute("aria-current")
  );
  const href = document.location.pathname;

  const target = menu.querySelector(
    `a[href="${href}"]`,
  );

  if (target) {
    target.setAttribute("aria-current", "page");
  }
});

nav.init();

document.body.addEventListener("click", () => {
  menu?.classList.remove("is-open");
});

document.querySelectorAll("lume-search").forEach((search) => {
  search.addEventListener("selected", (ev) => {
    nav.go(ev.detail.value);
  });
});
