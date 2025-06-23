import { b as createComponent, m as maybeRenderHead, e as renderSlot, d as renderTemplate, f as addAttribute, g as renderScript, r as renderComponent, F as Fragment } from './astro/server_0TAb0-Fu.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Icon } from './Icon_CIFy29iW.mjs';
import { c as config, g as getCollection } from './themeConfig_B5HJj9Rt.mjs';
import { f as formatString } from './formatString_1VDQSTot.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { useStore } from '@nanostores/vue';
import { atom } from 'nanostores';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
/* empty css                                                                          */

const $$SimpleLeftHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <h1 class="text-balance"> ${renderSlot($$result, $$slots["heading"])} </h1> <p class="max-w-lg text-md leading-8"> ${renderSlot($$result, $$slots["description"])} </p> </div>`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/hero/SimpleLeftHero.astro", void 0);

atom("");

const tags = atom([]);

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Grid",
  setup(__props, { expose: __expose }) {
    __expose();
    const availableTags = config.directoryData.tags;
    const selectedTags = useStore(tags);
    function toggleTagByName(tag) {
      if (!tag) return;
      if (!selectedTags.value.includes(tag)) {
        tags.set([...selectedTags.value, tag]);
      } else {
        let filtered = selectedTags.value.filter((e) => e !== tag);
        tags.set([...filtered]);
      }
    }
    function getTagColorClass(tagObj) {
      const colorClass = tagObj?.color ? `${tagObj.color}-tag` : "gray-tag";
      return colorClass;
    }
    const __returned__ = { availableTags, selectedTags, toggleTagByName, getTagColorClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-2 mt-4" }, _attrs))}><!--[-->`);
  ssrRenderList($setup.availableTags, (tag) => {
    _push(`<span class="${ssrRenderClass([[$setup.getTagColorClass(tag), $setup.selectedTags.includes(tag.key) ? "ring-2 ring-primary-500 ring-offset-1" : ""], "tag cursor-pointer select-none transition-all duration-200 hover:opacity-80"])}">${ssrInterpolate(tag.name)}</span>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tags/Grid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UiTagGrid = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Select",
  setup(__props, { expose: __expose }) {
    __expose();
    const availableTags = config.directoryData.tags;
    const selectedTags = useStore(tags);
    function removeTag(tag) {
      const updatedTags = selectedTags.value.filter((t) => t !== tag);
      tags.set(updatedTags);
    }
    function addTagWithEvent(event) {
      const select = event.target;
      const selectedTagName = select.value;
      if (!selectedTagName) return;
      const tagConfig = availableTags?.find((tag) => tag.name === selectedTagName);
      const selectedTagKey = tagConfig?.key || selectedTagName;
      if (!selectedTags.value.includes(selectedTagKey)) {
        tags.set([...selectedTags.value, selectedTagKey]);
      }
      select.value = "";
    }
    function getTagColorClass(tagKey) {
      const tagConfig = availableTags?.find((tag) => tag.key === tagKey);
      const colorClass = tagConfig?.color ? `${tagConfig.color}-tag` : "gray-tag";
      return colorClass;
    }
    const __returned__ = { availableTags, selectedTags, removeTag, addTagWithEvent, getTagColorClass };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex m-0 gap-4 mt-4 py-2" }, _attrs))} data-v-f0ad7094><!--[-->`);
  ssrRenderList($setup.selectedTags, (myTag) => {
    _push(`<div class="${ssrRenderClass([$setup.getTagColorClass(myTag), "relative group tag"])}" data-v-f0ad7094><span class="absolute text-gray-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-gray-100 flex items-center justify-center -top-4 left-0 bg-white rounded-full h-6 w-6 border dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800" data-v-f0ad7094>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    _push(`</span> ${ssrInterpolate($setup.availableTags?.find((tag) => tag.key === myTag)?.name || myTag)}</div>`);
  });
  _push(`<!--]--><select class="border border-dashed border-gray-300 rounded-lg font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 focus:ring-primary-500 focus:ring-2 focus:border-none ring-offset-4" data-v-f0ad7094><option value="" disabled selected data-v-f0ad7094> Select a tag </option><!--[-->`);
  ssrRenderList($setup.availableTags, (tag) => {
    _push(`<option${ssrRenderAttr("value", tag.name)} data-v-f0ad7094>${ssrInterpolate(tag.name)}</option>`);
  });
  _push(`<!--]--></select></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tags/Select.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UiTagSelect = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f0ad7094"]]);

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const searchPlaceholder = await getSearchPlaceholder();
  async function getSearchPlaceholder() {
    if (config.directoryData.search?.placeholder && config.directoryData.search.placeholder.includes("{0}")) {
      const count = (await getCollection("directory")).length;
      return formatString(
        config.directoryData.search?.placeholder ?? "Search among {0} listings",
        count
      );
    }
    return config.directoryData.search?.placeholder ?? "Search";
  }
  return renderTemplate`${maybeRenderHead()}<div class="mb-10 not-prose"> <div class="mt-2 flex rounded-md shadow-sm"> <div class="relative flex flex-grow items-stretch focus-within:z-10"> ${config.directoryUI.search.icon ? renderTemplate`<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"> ${renderComponent($$result, "Icon", $$Icon, { "name": config.directoryUI.search.icon, "class": "h-5 w-5 text-gray-400", "aria-hidden": "true" })} </div>` : ""} <input id="search"${addAttribute(`block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:active:ring-primary-400 dark:bg-gray-700 dark:ring-gray-600 dark:text-gray-200 dark:placeholder:text-gray-400 ${config.directoryUI.search?.icon ? "pl-10" : ""}`, "class")}${addAttribute(searchPlaceholder, "placeholder")}> <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5"> <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400 dark:border-gray-500 dark:text-gray-500">⌘K</kbd> </div> </div> </div> ${() => {
    const sidebar = config.layout.sidebar;
    if (sidebar) {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {})}`;
    }
    if (config.directoryUI.search.tags.display === "select") {
      return renderTemplate`${renderComponent($$result, "UiTagSelect", UiTagSelect, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/ui/tags/Select.vue", "client:component-export": "default" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "tabler:x" })} ` })}`;
    }
    if (config.directoryUI.search.tags.display === "show-all") {
      return renderTemplate`${renderComponent($$result, "UiTagGrid", UiTagGrid, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/ui/tags/Grid.vue", "client:component-export": "default" })}`;
    }
  }} </div> ${renderScript($$result, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/Search.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewjacobs/Documents/media-planning-tool/astro-template/src/components/directory/Search.astro", void 0);

export { $$SimpleLeftHero as $, $$Search as a };
