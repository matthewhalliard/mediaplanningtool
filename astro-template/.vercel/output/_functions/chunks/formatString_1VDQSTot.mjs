import { b as createComponent, m as maybeRenderHead, d as renderTemplate, a as createAstro, f as addAttribute, r as renderComponent, F as Fragment, o as renderTransition } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import { c as config } from './themeConfig_B5HJj9Rt.mjs';
import { $ as $$Tag } from './Tag_Dv0TEDxi.mjs';
import 'clsx';
import './index_DfOMS8cV.mjs';
import { $ as $$Image } from './_astro_assets_B1BPz9R9.mjs';
/* empty css                                   */

const $$FeaturedTag = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span class="absolute text-sm ml-4 font-medium py-0.5 group-hover:border-primary-500 -top-3 border border-gray-300 rounded-full bg-white px-3.5 text-gray-600 dark:bg-gray-800 dark:border-gray-500 dark:text-white"> ${config.directoryUI.featured.labelForCard} </span>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/FeaturedTag.astro", void 0);

function getClearbitLogoUrl(url) {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    let domain = urlObj.hostname;
    if (domain.startsWith("www.")) {
      domain = domain.substring(4);
    }
    if (domain.startsWith("advertising.amazon.com")) {
      domain = "amazon.com";
    } else if (domain.startsWith("business.facebook.com")) {
      domain = "facebook.com";
    } else if (domain.startsWith("business.linkedin.com")) {
      domain = "linkedin.com";
    } else if (domain.startsWith("ads.tiktok.com")) {
      domain = "tiktok.com";
    } else if (domain.startsWith("marketingplatform.google.com")) {
      domain = "google.com";
    } else if (domain.startsWith("business.adobe.com")) {
      domain = "adobe.com";
    }
    return `https://logo.clearbit.com/${domain}`;
  } catch (error) {
    console.warn("Invalid URL for Clearbit logo:", url);
    return null;
  }
}
function getFallbackLogoUrl(title) {
  if (!title) return "";
  const initials = title.split(" ").slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join("");
  const colors = [
    "4F46E5",
    "7C3AED",
    "DB2777",
    "DC2626",
    "EA580C",
    "059669",
    "0891B2",
    "2563EB",
    "7C2D12",
    "831843"
  ];
  const colorIndex = title.length % colors.length;
  const backgroundColor = colors[colorIndex];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${backgroundColor}&color=fff&size=200&bold=true`;
}

const $$Astro$3 = createAstro("https://www.mediaplanningtool.com");
const $$RectangleCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RectangleCard;
  const { myItem, href } = Astro2.props;
  const clearbitLogoUrl = !myItem.image ? getClearbitLogoUrl(myItem.link) : null;
  const fallbackLogoUrl = getFallbackLogoUrl(myItem.title || "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="block h-full border border-gray-200 dark:border-gray-500 hover:border-gray-400 hover:border-solid dark:hover:border-gray-300 rounded relative group transition-all duration-300"> ${myItem.featured ? renderTemplate`${renderComponent($$result, "DirectoryFeaturedTag", $$FeaturedTag, { "class": "ml-6" })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`} ${myItem.image ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "height": 500, "width": 800, "class": "w-full h-40 rounded-t object-cover", "src": myItem.image, "alt": myItem.title })}` : clearbitLogoUrl ? renderTemplate`<div class="w-full h-40 flex justify-center items-center rounded-t bg-gray-50 dark:bg-gray-700 p-6"> <img${addAttribute(clearbitLogoUrl, "src")}${addAttribute(`${myItem.title} logo`, "alt")} class="max-h-20 max-w-28 object-contain"${addAttribute(`this.onerror=null; this.src='${fallbackLogoUrl}'; this.className='w-16 h-16 rounded-full object-cover';`, "onerror")} loading="lazy"> </div>` : renderTemplate`<div class="w-full h-40 px-3 text-center flex justify-center items-center rounded-t font-bold text-xl bg-gray-200 dark:bg-gray-600"> ${myItem.title} </div>`} <div class="p-8"> <h3 class="m-0 text-xl font-semibold dark:text-gray-50 card-title leading-tight"> ${myItem?.title} </h3> <p class="line-clamp-3 mt-3 text-sm text-gray-600 dark:text-gray-300 card-description leading-relaxed"> ${myItem.description} </p> <div class="p-0 mt-4 flex flex-wrap gap-2"> ${myItem.tags?.map(
    (e) => renderTemplate`${renderComponent($$result, "UiTag", $$Tag, { "tag": e })}`
  )} </div> </div> </a>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/cards/RectangleCard.astro", void 0);

const $$Astro$2 = createAstro("https://www.mediaplanningtool.com");
const $$SmallHorizontalCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SmallHorizontalCard;
  const { myItem, href } = Astro2.props;
  const clearbitLogoUrl = !myItem.image ? getClearbitLogoUrl(myItem.link) : null;
  const fallbackLogoUrl = getFallbackLogoUrl(myItem.title || "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="block h-full border border-gray-200 dark:border-gray-500 hover:border-gray-400 hover:border-solid dark:hover:border-gray-300 rounded relative group transition-all duration-300"> ${myItem.featured ? renderTemplate`${renderComponent($$result, "DirectoryFeaturedTag", $$FeaturedTag, { "class": "ml-6" })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`} <div class="flex"> ${myItem.image ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "height": 200, "width": 200, "class": "w-24 h-24 rounded-l object-cover flex-shrink-0", "src": myItem.image, "alt": myItem.title })}` : clearbitLogoUrl ? renderTemplate`<div class="w-24 h-24 flex justify-center items-center rounded-l bg-gray-50 dark:bg-gray-700 p-3 flex-shrink-0"> <img${addAttribute(clearbitLogoUrl, "src")}${addAttribute(`${myItem.title} logo`, "alt")} class="max-h-16 max-w-16 object-contain"${addAttribute(`this.onerror=null; this.src='${fallbackLogoUrl}'; this.className='w-12 h-12 rounded-full object-cover';`, "onerror")} loading="lazy"> </div>` : renderTemplate`<div class="w-24 h-24 flex justify-center items-center rounded-l bg-gray-200 dark:bg-gray-600 text-sm font-bold flex-shrink-0"> ${myItem.title?.substring(0, 2).toUpperCase()} </div>`} <div class="p-4 flex-1"> <h3 class="m-0 text-lg font-semibold dark:text-gray-50 card-title"> ${myItem?.title} </h3> <p class="line-clamp-2 mt-1 text-sm card-description"> ${myItem.description} </p> <div class="p-0 mt-2 flex flex-wrap gap-1"> ${myItem.tags?.slice(0, 3).map(
    (e) => renderTemplate`${renderComponent($$result, "UiTag", $$Tag, { "tag": e })}`
  )} </div> </div> </div> </a>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/cards/SmallHorizontalCard.astro", void 0);

const $$Astro$1 = createAstro("https://www.mediaplanningtool.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const { item } = Astro2.props;
  const enabled = config.directoryUI.grid.card.image;
  const type = config.directoryUI.grid.type;
  const tagsString = Array.isArray(item.data.tags) ? item.data.tags.join(",") : "";
  const myItem = {
    ...item,
    ...item.data
  };
  const href = config.directoryData?.source?.linksOutbound ? myItem.link : `/${myItem.id}`;
  return renderTemplate`${maybeRenderHead()}<div class="listing"${addAttribute(tagsString, "data-tags")}${addAttribute(renderTransition($$result, "o6pg4zes", "", `${myItem.id}-card`), "data-astro-transition-scope")}> ${type === "rectangle-card-grid" && enabled ? renderTemplate`${renderComponent($$result, "RectangleCard", $$RectangleCard, { "myItem": myItem, "href": href })}` : type === "small-card-grid" && enabled ? renderTemplate`${renderComponent($$result, "SmallHorizontalCard", $$SmallHorizontalCard, { "myItem": myItem, "href": href })}` : renderTemplate`${renderComponent($$result, "RectangleCard", $$RectangleCard, { "myItem": myItem, "href": href })}`} </div>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/cards/index.astro", "self");

const $$Astro = createAstro("https://www.mediaplanningtool.com");
const $$PureGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PureGrid;
  const { listings } = Astro2.props;
  const type = config.directoryUI.grid.type;
  const grid = type == "rectangle-card-grid" || type == "small-card-grid";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([
    "not-prose grid grid-cols-1 gap-6",
    { "md:grid-cols-2 lg:grid-cols-3": grid }
  ], "class:list")}> ${Array.isArray(listings) && listings.map((e) => renderTemplate`${renderComponent($$result, "DirectoryCard", $$Index, { "item": e })}`)} </div>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/PureGrid.astro", void 0);

const formatString = (template, ...args) => {
  return template.replace(
    /{([0-9]+)}/g,
    function(match, index) {
      return typeof args[index] === "undefined" ? match : args[index];
    }
  );
};

export { $$PureGrid as $, formatString as f };
