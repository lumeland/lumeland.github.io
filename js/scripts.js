import Navigator from "./page-loader/navigator.js";
const menu = document.querySelector(".menu");
const btn = document.querySelector(".menu-button");

btn.addEventListener("click", (ev) => {
  menu.classList.toggle("is-open");
  ev.stopPropagation();
});

const nav = new Navigator(async (load, event) => {
  const page = await load();

  await page.replaceContent("main");
  await page.updateState();
  await page.resetScroll();

  menu.querySelectorAll('a[aria-current="page"]').forEach((link) =>
    link.removeAttribute("aria-current")
  );

  const target = menu.querySelectorAll(
    `a[href="${event.target.getAttribute("href")}"]`,
  );

  if (target) {
    target.setAttribute("aria-current", "page");
  }
});

nav.init();

document.body.addEventListener("click", () => {
  menu.classList.remove("is-open");
});
