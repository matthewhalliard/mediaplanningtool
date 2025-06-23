import { b as createComponent, r as renderComponent, d as renderTemplate } from '../chunks/astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import { a as getEntry, r as renderEntry } from '../chunks/themeConfig_B5HJj9Rt.mjs';
import { $ as $$Landing } from '../chunks/Landing_BkPe-V_6.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("pages", "index");
  if (!entry) {
    throw new Error("Index page not found");
  }
  const { Content } = await renderEntry(entry);
  return renderTemplate`${renderComponent($$result, "Landing", $$Landing, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/pages/index.astro", void 0);

const $$file = "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
