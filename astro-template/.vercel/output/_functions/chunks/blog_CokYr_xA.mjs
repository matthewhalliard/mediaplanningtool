import { b as createComponent, r as renderComponent, d as renderTemplate, c as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import { g as getCollection } from './themeConfig_B5HJj9Rt.mjs';
import { $ as $$PureGrid } from './formatString_1VDQSTot.mjs';
import { $ as $$SimpleLeftHero } from './Search_CkFyBK6l.mjs';
import 'clsx';

const $$Grid = createComponent(async ($$result, $$props, $$slots) => {
  const allListings = await getCollection("blog");
  const blogListings = allListings.map((value) => ({
    ...value,
    id: `blog/${value.id}`
  }));
  return renderTemplate`${renderComponent($$result, "PureGrid", $$PureGrid, { "id": "directory-grid", "listings": blogListings })}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/blog/Grid.astro", void 0);

const frontmatter = {};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    hr: "hr",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode($$SimpleLeftHero, {
      image: "meditation.jpg",
      children: [createVNode("span", {
        slot: "heading",
        children: "The Blog"
      }), createVNode("span", {
        slot: "description",
        children: "Expert insights and analysis on media planning tools, campaign optimization strategies, and industry trends to help you make better marketing decisions."
      })]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode($$Grid, {})]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "/blog";
const file = "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/data/pages/blog.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/data/pages/blog.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
