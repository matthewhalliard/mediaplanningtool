import { b as createComponent, g as renderScript, d as renderTemplate, a as createAstro, f as addAttribute, r as renderComponent, p as renderHead, e as renderSlot, m as maybeRenderHead, h as createTransitionScope, F as Fragment } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
/* empty css                         */
import { c as config } from './themeConfig_B5HJj9Rt.mjs';
/* empty css                          */
import 'clsx';
/* empty css                                                                    */
import { $ as $$Icon } from './Icon_CIFy29iW.mjs';
/* empty css                                   */

const $$Posthog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/analytics/Posthog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/analytics/Posthog.astro", void 0);

const $$Astro$1 = createAstro("https://www.mediaplanningtool.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/node_modules/astro/components/ClientRouter.astro", void 0);

function getBasePath() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4321";
  }
  return config.general.seo.url;
}
function getOGImage(slug) {
  let basePath = getBasePath();
  return `${basePath}/og/${slug}.png`;
}

const $$Astro = createAstro("https://www.mediaplanningtool.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, slug } = Astro2.props;
  const siteTitle = config.general.title;
  const calculatedTitle = title || siteTitle;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${calculatedTitle}</title><meta name="description"${addAttribute(config.general.seo.description, "content")}><!-- Facebook Meta Tags --><meta property="og:url"${addAttribute(config.general.seo.url, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(calculatedTitle, "content")}><meta property="og:description"${addAttribute(config.general.seo.description, "content")}><meta property="og:image"${addAttribute(getOGImage(slug), "content")}><!-- Twitter Meta Tags --><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain" content="codeagents.dev"><meta property="twitter:url"${addAttribute(config.general.seo.url, "content")}><meta name="twitter:title"${addAttribute(config.general.seo.name, "content")}><meta name="twitter:description"${addAttribute(config.general.seo.description, "content")}><meta name="twitter:image"${addAttribute(getOGImage(slug), "content")}>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="bg-white dark:bg-gray-900"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Posthog", $$Posthog, {})} </body></html>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/layouts/BaseLayout.astro", void 0);

const $$Prose = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<main class="max-w-none font-display prose prose-zinc dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-a:hover:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b prose-a:hover:border-solid prose-a:hover:border-primary-400 prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-a:border-gray-400 dark:prose-a:border-gray-400 dark:prose-a:hover:border-primary-400"> ${renderSlot($$result, $$slots["default"])} </main>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/Prose.astro", void 0);

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse"> ${config.general.logo ? renderTemplate`<img sizes="32px"${addAttribute(config.general.logo, "src")} class="h-8"${addAttribute(config?.general.title + " Logo", "alt")}>` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "class": "w-7 h-7 text-gray-600 dark:text-white", "name": config?.general?.iconLogo })}`} <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">${config.general.title}</span> </a>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/Logo.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const socials = Object.values(config.footer.socials);
  const socialNames = Object.keys(config.footer.socials);
  const navigation = [
    {
      title: "Directory",
      links: [
        { title: "Submit", link: "/submit" },
        { title: "Advertise", link: "/advertise" }
      ]
    },
    {
      title: "Categories",
      links: config.directoryData.tags?.filter((e) => e && e.name).map((e) => ({
        title: e.name,
        link: `/tags/${e.key}`
      })).slice(0, 4)
    },
    {
      title: "Blog",
      links: [{ title: "Articles", link: "/blog" }]
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", link: "/legal/terms-of-service" },
        { title: "Terms of Service", link: "/legal/privacy-policy" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-gray-200 dark:border-gray-600 font-display" aria-labelledby="footer-heading"> <h2 id="footer-heading" class="sr-only">Footer</h2> <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32"> <div class="xl:grid xl:grid-cols-3 xl:gap-8"> <div class="space-y-8"> ${renderComponent($$result, "AppLogo", $$Logo, {})} <div class="flex space-x-6"> ${socials.map((item, index) => renderTemplate`<a${addAttribute(item?.link, "href")} class="text-gray-400 hover:text-gray-500"> <span class="sr-only">${item}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": config.ui.icons[socialNames[index]], "class": "h-6 w-6", "aria-hidden": "true" })} </a>`)} </div> </div> <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0"> ${[...Array(2).keys()].map((count) => renderTemplate`<div class="md:grid md:grid-cols-2 md:gap-8"> <div> <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase"> ${navigation[count].title} </h3> <ul role="list" class="mt-6 space-y-4"> ${navigation[count].links.map((item) => renderTemplate`<li> <a${addAttribute(item.link, "href")} class="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:dark:text-gray-400 hover:text-gray-900"> ${item.title} </a> </li>`)} </ul> </div> <div class="mt-10 md:mt-0"> <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase"> ${navigation[count + 2].title} </h3> <ul role="list" class="mt-6 space-y-4"> ${navigation[count + 2].links.map((item) => renderTemplate`<li> <a${addAttribute(item.link, "href")} class="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:dark:text-gray-400 hover:text-gray-900"> ${item.title} </a> </li>`)} </ul> </div> </div>`)} </div> </div> <div class="mt-16 border-t border-gray-900/10 dark:border-gray-600 pt-8 sm:mt-20 lg:mt-24"> <p class="text-xs leading-5 text-gray-500">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${config.general.title} All rights reserved.
</p> </div> </div> </footer>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/Footer.astro", void 0);

const $$ColorSelector = createComponent(($$result, $$props, $$slots) => {
  const config$1 = config.ui.icons;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(createTransitionScope($$result, "4z5srsgt"), "data-astro-transition-persist")}> <button id="theme-toggle" class="flex justify-center items-center border border-gray-200 rounded-full w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-500 transition-all"> <span class="sr-only">Toggle Theme</span> ${renderComponent($$result, "Icon", $$Icon, { "class": "hidden dark:block", "name": config$1?.dark ?? "tabler:moon" })} ${renderComponent($$result, "Icon", $$Icon, { "class": "dark:hidden", "name": config$1?.light ?? "tabler:sun" })} </button> </div> ${renderScript($$result, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/header/ColorSelector.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/header/ColorSelector.astro", "self");

const $$Dot = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"> <circle cx="1" cy="1" r="1"></circle> </svg>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/header/Dot.astro", void 0);

const $$Banner = createComponent(($$result, $$props, $$slots) => {
  const getHref = () => {
    const link = config.header.banner?.link;
    if (link) {
      return link;
    }
    return "#";
  };
  const href = getHref();
  return renderTemplate`${config.header.banner.show ? renderTemplate`${maybeRenderHead()}<div class="flex items-center justify-center gap-x-6 bg-primary-600 px-6 py-2.5"><p class="text-sm leading-6 text-white"><a${addAttribute(href, "href")} target="_blank" class="inline-flex items-center gap-1"><strong v-if="bannerConfig?.brandText" class="font-semibold hidden sm:block">${config.header.banner.brandText}</strong>${config.header.banner.brandText ? renderTemplate`${renderComponent($$result, "Dot", $$Dot, { "class": "hidden sm:block", "v-if": "bannerConfig?.brandText" })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`}${config.header.banner?.text}${renderComponent($$result, "Icon", $$Icon, { "class": "hidden sm:block w-5 h-5", "name": "tabler:arrow-right" })}</a></p></div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/app/header/Banner.astro", void 0);

export { $$BaseLayout as $, $$Prose as a, $$Logo as b, $$ColorSelector as c, $$Banner as d, $$Footer as e };
