import Navigator from "./vendor/page-loader/navigator.js";
import psyche, {
  platformModifier,
} from "https://deno.land/x/psyche@v0.3.2/client/psyche.min.mjs";

const menu = document.querySelector(".menu");
const btn = document.querySelector(".menu-button");

btn?.addEventListener("click", (ev) => {
  menu.classList.toggle("is-open");
  ev.stopPropagation();
});

const nav = new Navigator(async (load, _event) => {
  const page = await load();

  await page.replaceContent("main");
  await page.replaceContent("footer");
  await page.updateState();
  await page.resetScroll();

  menu
    .querySelectorAll('a[aria-current="page"]')
    .forEach((link) => link.removeAttribute("aria-current"));

  const href = document.location.pathname,
    target = menu.querySelector(`a[href="${href}"]`);
  if (target) target.setAttribute("aria-current", "page");
});

nav.init();

document.body.addEventListener("click", () => {
  menu?.classList.remove("is-open");
});

const searchTheme = {
    text: "var(--color-foreground)",
    secondary: "var(--color-foreground-50)",
    background: "var(--color-background)",
    border: "var(--color-background-20)",
    accent: "var(--color-brand)",
    interactive: "var(--color-background-10)",
    scrollbar: "var(--color-brand)",
    scrollbarHover: "var(--color-brand)",
  },
  searchInstance = psyche({
    theme: {
      font: {
        sans: "var(--font-family-sans)",
        mono: "var(--font-family-mono)",
      },
      light: searchTheme,
      dark: searchTheme,
      darkMode: "media",
    },
    index: await fetch("/search.json").then((res) => res.json()),
  }),
  searchTrigger = document.querySelector(".navbar-search");
searchInstance.$component.addEventListener("click", (e) => {
  // route search results
  const $a = e.composedPath().find(($) => $ instanceof Element && $.matches("a"));
  if ($a) {
    e.preventDefault();
    nav.go($a.href);
  }
});
searchInstance.register();
if (searchTrigger) {
  searchTrigger.querySelector("kbd").innerText = `${platformModifier} + K`;
  searchTrigger.addEventListener("click", searchInstance.open);
}
