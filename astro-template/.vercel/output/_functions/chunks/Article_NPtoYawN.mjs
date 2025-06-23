import { a as createAstro, b as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as renderSlot } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
/* empty css                         */
import { $ as $$BaseLayout, a as $$Prose } from './Banner_CsduCQyV.mjs';
import { c as config } from './themeConfig_B5HJj9Rt.mjs';
import { $ as $$AppShell } from './AppShell_B-6sNsor.mjs';

const $$Astro = createAstro("https://www.mediaplanningtool.com");
const $$Article = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Article;
  const { frontmatter, slug } = Astro2.props;
  const siteTitle = config.general.title;
  const title = frontmatter?.title || siteTitle;
  const description = frontmatter?.description;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "slug": slug }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AppShell", $$AppShell, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl w-full mx-auto py-20"> ${renderComponent($$result3, "AppProse", $$Prose, {}, { "default": ($$result4) => renderTemplate` ${renderSlot($$result4, $$slots["default"])} ` })} </div> ` })} ` })}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/layouts/Article.astro", void 0);

export { $$Article as $ };
