import { b as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as renderSlot } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import { c as config } from './themeConfig_B5HJj9Rt.mjs';
import { $ as $$Sidebar } from './Sidebar_B24T786Z.mjs';
import { $ as $$AppShell } from './AppShell_B-6sNsor.mjs';
import { $ as $$BaseLayout, a as $$Prose } from './Banner_CsduCQyV.mjs';

const $$Wide = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AppShell", $$AppShell, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl xl:max-w-6xl px-5 py-10 mx-auto"> ${renderComponent($$result3, "Prose", $$Prose, {}, { "default": ($$result4) => renderTemplate` ${renderSlot($$result4, $$slots["default"])} ` })} </div> ` })} ` })}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/layouts/Wide.astro", void 0);

const $$Landing = createComponent(($$result, $$props, $$slots) => {
  const sidebar = config.layout.sidebar;
  return renderTemplate`${sidebar ? renderTemplate`${renderComponent($$result, "Sidebar", $$Sidebar, {}, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}` : renderTemplate`${renderComponent($$result, "Wide", $$Wide, {}, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/layouts/Landing.astro", void 0);

export { $$Landing as $ };
