import { a as createAstro, b as createComponent, m as maybeRenderHead, r as renderComponent, g as renderScript, f as addAttribute, d as renderTemplate, F as Fragment, h as createTransitionScope, e as renderSlot } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import { b as $$Logo, c as $$ColorSelector, d as $$Banner, e as $$Footer, $ as $$BaseLayout, a as $$Prose } from './Banner_CsduCQyV.mjs';
import { $ as $$Icon } from './Icon_CIFy29iW.mjs';
import { c as config } from './themeConfig_B5HJj9Rt.mjs';
/* empty css                                   */
import 'clsx';

const $$Astro$2 = createAstro("https://www.mediaplanningtool.com");
const $$SidebarNavbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SidebarNavbar;
  const isActive = (path, currentPath2) => {
    if (!currentPath2) return false;
    return currentPath2.split("/")[1] === path.split("/")[1] || currentPath2 === path;
  };
  const currentPath = new URL(Astro2.request.url).pathname;
  return renderTemplate`${maybeRenderHead()}<nav class="w-full z-20 start-0"> <div class="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4"> <div class="flex items-center gap-x-12"> ${renderComponent($$result, "Logo", $$Logo, {})} <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky"> <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700"> ${config.header.navbar.links.map((nav) => renderTemplate`<li> <a${addAttribute(nav.href, "href")}${addAttribute(nav.target || "_self", "target")} class="font-medium inline-flex py-2 px-3 text-gray-700 dark:text-gray-200 bg-primary-700 rounded md:bg-transparent md:p-0 md:dark:text-gray-300" aria-current="page"> ${nav.name} ${nav.target === "_blank" ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "class": "text-gray-500", "name": "tabler:arrow-up-right" })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`} </a> </li>`)} </ul> </div> </div> <div class="flex gap-3 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"> ${config.header.actionButton.href && renderTemplate`<a${addAttribute(config.header.actionButton.href, "href")} class="hidden md:inline-flex items-center dark:text-gray-300 text-gray-600"> ${config.header.actionButton.text} </a>`} ${renderComponent($$result, "ColorSelector", $$ColorSelector, { "class": "hidden md:flex", "data-astro-transition-persist": createTransitionScope($$result, "2yxpuy3f") })} <button id="mobile-menu-button" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false"> <span class="sr-only">Open main menu</span> <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path> </svg> </button> <div id="mobile-menu" class="sm:hidden hidden"> <div class="space-y-1 pb-4 pt-2"> ${config.header.navbar.links.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${isActive(item.href, currentPath) ? "bg-primary-50 border-primary-500 text-primary-700" : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"}`, "class")}> ${item.name} ${item.target === "_blank" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:external-link" })}`} </a>`)} </div> </div> </div> </div></nav> ${renderScript($$result, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/SidebarNavbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/SidebarNavbar.astro", "self");

const $$SidebarTags = createComponent(($$result, $$props, $$slots) => {
  const tags = config.directoryData.tags;
  const emoji = config.layout.emoji;
  return renderTemplate`${maybeRenderHead()}<div class="hidden md:block max-w-50 w-full border-r border-gray-200 dark:border-gray-700 dark:text-gray-50"> <a class="flex mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" href="/"> <span class="border border-gray-200 dark:border-gray-600 rounded h-7 w-7 inline-flex items-center justify-center">${emoji && "\u{1F3E0}"}</span> <span>Home</span> </a> ${tags.map((tag) => renderTemplate`<a class="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"${addAttribute(`/tags/${tag.key}`, "href")}> <span class="border border-gray-200 dark:border-gray-600 rounded h-7 w-7 inline-flex items-center justify-center"> ${tag.emoji && tag.emoji} </span> <span>${tag.name}</span> </a>`)} </div>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/SidebarTags.astro", void 0);

const $$Astro$1 = createAstro("https://www.mediaplanningtool.com");
const $$SidebarShell = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SidebarShell;
  const { showSidebar = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> ${renderComponent($$result, "Banner", $$Banner, {})} <div class="md:flex"> ${showSidebar && renderTemplate`${renderComponent($$result, "SidebarTags", $$SidebarTags, {})}`} <div class="w-full min-h-dvh"> ${renderComponent($$result, "SidebarNavbar", $$SidebarNavbar, {})} ${renderSlot($$result, $$slots["default"])} </div> </div> </div> ${renderComponent($$result, "Footer", $$Footer, {})}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/SidebarShell.astro", void 0);

const $$Astro = createAstro("https://www.mediaplanningtool.com");
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SidebarShell", $$SidebarShell, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl xl:max-w-6xl px-5 py-10 mx-auto"> ${renderComponent($$result3, "Prose", $$Prose, {}, { "default": ($$result4) => renderTemplate` ${renderSlot($$result4, $$slots["default"])} ` })} </div> ` })} ` })}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/layouts/Sidebar.astro", void 0);

export { $$Sidebar as $, $$SidebarShell as a };
