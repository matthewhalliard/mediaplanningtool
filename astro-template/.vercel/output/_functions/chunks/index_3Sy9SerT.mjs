import { b as createComponent, r as renderComponent, g as renderScript, d as renderTemplate, c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import { g as getCollection } from './themeConfig_B5HJj9Rt.mjs';
import { $ as $$PureGrid } from './formatString_1VDQSTot.mjs';
import { $ as $$SimpleLeftHero, a as $$Search } from './Search_CkFyBK6l.mjs';
import 'clsx';

async function getListings() {
  return await getCollection("directory");
}

const $$Grid = createComponent(async ($$result, $$props, $$slots) => {
  const allListings = (await getListings()).sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured)
  );
  return renderTemplate`${renderComponent($$result, "PureGrid", $$PureGrid, { "id": "directory-grid", "listings": allListings })} ${renderScript($$result, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/Grid.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/Grid.astro", void 0);

const frontmatter = {};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  return createVNode(Fragment, {
    children: [createVNode($$SimpleLeftHero, {
      children: [createVNode("span", {
        slot: "heading",
        children: "Best Media Planning Tools 2025"
      }), createVNode("span", {
        slot: "description",
        children: "A comprehensive directory of software for modern media planning."
      })]
    }), "\n", createVNode($$Search, {}), "\n", createVNode($$Grid, {})]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent();
}

const url = "";
const file = "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/data/pages/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/data/pages/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
