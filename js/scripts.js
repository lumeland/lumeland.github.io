import Navigator from "./page-loader/navigator.js";
const menu = document.querySelector(".menu-links");

const nav = new Navigator(async (load, event) => {
  const page = await load();

  await page.replaceContent("main");
  await page.updateState();
  await page.resetScroll();

  menu.querySelectorAll('a[aria-current="page"]').forEach((link) =>
    link.removeAttribute("aria-current")
  );

  event.target.setAttribute("aria-current", "page");
});

nav.init();

const btn = document.querySelector('.menu-button');
btn.addEventListener('click', () => btn.classList.toggle("is-selected"));