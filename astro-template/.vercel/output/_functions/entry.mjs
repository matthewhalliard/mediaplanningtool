import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_D-y1crGU.mjs';
import { manifest } from './manifest_DMgdfuus.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/og/blog/_---slug_.png.astro.mjs');
const _page3 = () => import('./pages/og/_---slug_.png.astro.mjs');
const _page4 = () => import('./pages/tags/_slug_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const _page6 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/og/blog/[...slug].png.ts", _page2],
    ["src/pages/og/[...slug].png.ts", _page3],
    ["src/pages/tags/[slug].astro", _page4],
    ["src/pages/index.astro", _page5],
    ["src/pages/[...slug].astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0afa8312-9b92-41eb-9ee3-4917c46b5fdb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
