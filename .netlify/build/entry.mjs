import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DgfjeQ0u.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/contactanos.astro.mjs');
const _page1 = () => import('./pages/equipos.astro.mjs');
const _page2 = () => import('./pages/nosotros.astro.mjs');
const _page3 = () => import('./pages/proyectos.astro.mjs');
const _page4 = () => import('./pages/servicios.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/contactanos.astro", _page0],
    ["src/pages/equipos.astro", _page1],
    ["src/pages/nosotros.astro", _page2],
    ["src/pages/proyectos.astro", _page3],
    ["src/pages/servicios.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7b3fd83d-22ad-473b-a948-8046e93729a7"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
