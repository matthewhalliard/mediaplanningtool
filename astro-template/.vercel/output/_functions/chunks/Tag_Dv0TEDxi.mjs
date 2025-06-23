import { b as createComponent, a as createAstro, m as maybeRenderHead, f as addAttribute, d as renderTemplate } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import 'clsx';
import { c as config } from './themeConfig_B5HJj9Rt.mjs';

const $$Astro = createAstro("https://www.mediaplanningtool.com");
const $$Tag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tag;
  const config$1 = config.directoryData.tags;
  const { tag } = Astro2.props;
  const configTag = config$1?.find((element) => element.key === tag);
  const tagClass = configTag?.color ? `${configTag.color}-tag` : "gray-tag";
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["tag", tagClass], "class:list")}> ${configTag?.name || tag} </span>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/ui/tags/Tag.astro", void 0);

export { $$Tag as $ };
