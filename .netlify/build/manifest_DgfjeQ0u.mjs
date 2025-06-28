import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_BfljBqH4.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/CODE/WEBs/geocore-web/","cacheDir":"file:///D:/CODE/WEBs/geocore-web/node_modules/.astro/","outDir":"file:///D:/CODE/WEBs/geocore-web/dist/","srcDir":"file:///D:/CODE/WEBs/geocore-web/src/","publicDir":"file:///D:/CODE/WEBs/geocore-web/public/","buildClientDir":"file:///D:/CODE/WEBs/geocore-web/dist/","buildServerDir":"file:///D:/CODE/WEBs/geocore-web/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"contactanos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contactanos","isIndex":false,"type":"page","pattern":"^\\/contactanos\\/?$","segments":[[{"content":"contactanos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contactanos.astro","pathname":"/contactanos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"equipos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/equipos","isIndex":false,"type":"page","pattern":"^\\/equipos\\/?$","segments":[[{"content":"equipos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/equipos.astro","pathname":"/equipos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"nosotros/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"proyectos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proyectos","isIndex":false,"type":"page","pattern":"^\\/proyectos\\/?$","segments":[[{"content":"proyectos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyectos.astro","pathname":"/proyectos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"servicios/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/servicios","isIndex":false,"type":"page","pattern":"^\\/servicios\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios.astro","pathname":"/servicios","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://geocore-web.netlify.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/CODE/WEBs/geocore-web/src/pages/contactanos.astro",{"propagation":"none","containsHead":true}],["D:/CODE/WEBs/geocore-web/src/pages/equipos.astro",{"propagation":"none","containsHead":true}],["D:/CODE/WEBs/geocore-web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/CODE/WEBs/geocore-web/src/pages/nosotros.astro",{"propagation":"none","containsHead":true}],["D:/CODE/WEBs/geocore-web/src/pages/proyectos.astro",{"propagation":"none","containsHead":true}],["D:/CODE/WEBs/geocore-web/src/pages/servicios.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/contactanos@_@astro":"pages/contactanos.astro.mjs","\u0000@astro-page:src/pages/equipos@_@astro":"pages/equipos.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/proyectos@_@astro":"pages/proyectos.astro.mjs","\u0000@astro-page:src/pages/servicios@_@astro":"pages/servicios.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DgfjeQ0u.mjs","D:/CODE/WEBs/geocore-web/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","D:/CODE/WEBs/geocore-web/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_vtw--mm3.mjs","D:/CODE/WEBs/geocore-web/src/components/machines/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.CF9kPILS.js","D:/CODE/WEBs/geocore-web/src/components/Projects/ListProjects.astro?astro&type=script&index=0&lang.ts":"_astro/ListProjects.astro_astro_type_script_index_0_lang.BZoVq39x.js","D:/CODE/WEBs/geocore-web/src/components/Services/ServiceGrid.astro?astro&type=script&index=0&lang.ts":"_astro/ServiceGrid.astro_astro_type_script_index_0_lang.Boj40ytL.js","D:/CODE/WEBs/geocore-web/src/components/Services/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.DAHSkxNZ.js","D:/CODE/WEBs/geocore-web/src/components/Home/About.astro?astro&type=script&index=0&lang.ts":"_astro/About.astro_astro_type_script_index_0_lang.DduWpidj.js","D:/CODE/WEBs/geocore-web/src/components/Home/Brands.astro?astro&type=script&index=0&lang.ts":"_astro/Brands.astro_astro_type_script_index_0_lang.Ca9-mHd_.js","D:/CODE/WEBs/geocore-web/src/components/Home/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.DUIqW-iV.js","D:/CODE/WEBs/geocore-web/src/components/Home/Services.astro?astro&type=script&index=0&lang.ts":"_astro/Services.astro_astro_type_script_index_0_lang.CC9pygX5.js","D:/CODE/WEBs/geocore-web/src/components/Home/Project.astro?astro&type=script&index=0&lang.ts":"_astro/Project.astro_astro_type_script_index_0_lang.LULdBuEM.js","D:/CODE/WEBs/geocore-web/src/layouts/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.CXo6TLdO.js","D:/CODE/WEBs/geocore-web/src/layouts/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.nVoJ_U3O.js","D:/CODE/WEBs/geocore-web/src/components/Home/Modal.astro?astro&type=script&index=0&lang.ts":"_astro/Modal.astro_astro_type_script_index_0_lang.DdZcqbYi.js","D:/CODE/WEBs/geocore-web/src/components/Modal.astro?astro&type=script&index=0&lang.ts":"_astro/Modal.astro_astro_type_script_index_0_lang.DHKRJK2P.js","D:/CODE/WEBs/geocore-web/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","D:/CODE/WEBs/geocore-web/src/components/Projects/ImageSlider.astro?astro&type=script&index=0&lang.ts":"_astro/ImageSlider.astro_astro_type_script_index_0_lang.BjOuv4LM.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/CODE/WEBs/geocore-web/src/components/Projects/ListProjects.astro?astro&type=script&index=0&lang.ts","let i=!1;function l(o,e=.2){const t=o.getBoundingClientRect(),n=window.innerHeight||document.documentElement.clientHeight;return t.top<=n*(1-e)}function r(){if(i)return;document.querySelectorAll(\".project-card\").forEach((e,t)=>{const n=t*100;setTimeout(()=>{e.style.transition=\"all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)\",e.style.opacity=\"1\",e.style.transform=\"translateY(0) scale(1)\"},n)}),i=!0}function a(){const o=document.getElementById(\"projects-section\");o&&l(o,.3)&&r()}function d(o){const e=JSON.parse(o);let t=[];e.image&&t.push(e.image),e.images&&e.images.length>0&&e.images.forEach(n=>{t.includes(n)||t.push(n)}),window.openModal&&window.openModal({title:e.title,images:t})}document.addEventListener(\"astro:page-load\",()=>{i=!1,document.querySelectorAll(\".project-card\").forEach(n=>{n.style.opacity=\"0\",n.style.transform=\"translateY(96px) scale(0.95)\",n.addEventListener(\"click\",c=>{c.preventDefault();const s=n.getAttribute(\"data-project\");s&&d(s)})}),a();let e=!1;function t(){e||(requestAnimationFrame(()=>{a(),e=!1}),e=!0)}window.addEventListener(\"scroll\",t),window.addEventListener(\"resize\",t)});"],["D:/CODE/WEBs/geocore-web/src/components/Home/Brands.astro?astro&type=script&index=0&lang.ts","function r(){const e={threshold:.1,rootMargin:\"0px 0px -20% 0px\"},t=new IntersectionObserver(d=>{d.forEach(i=>{if(i.isIntersecting){const a=i.target.querySelector(\".brands-title\"),o=i.target.querySelector(\".brands-slider-wrapper\");a&&a.classList.add(\"animate-in\"),o&&o.classList.add(\"animate-in\"),t.unobserve(i.target)}})},e),n=document.querySelector(\".brands-container\");n&&t.observe(n)}function s(){const e=document.querySelector(\".brands-container\");if(!e)return!1;const t=e.querySelector(\".brands-title\"),n=e.querySelector(\".brands-slider-wrapper\");return!(t?.classList.contains(\"animate-in\")||n?.classList.contains(\"animate-in\"))}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",()=>{s()&&r()}):s()&&r();document.addEventListener(\"astro:page-load\",()=>{setTimeout(()=>{s()&&r()},50)});"],["D:/CODE/WEBs/geocore-web/src/components/Projects/ImageSlider.astro?astro&type=script&index=0&lang.ts","class s{images=[];currentIndex=0;mainImage;thumbnailsContainer;counter;prevBtn;nextBtn;slider;constructor(){this.mainImage=document.getElementById(\"slider-main-image\"),this.thumbnailsContainer=document.getElementById(\"thumbnails-container\"),this.counter=document.getElementById(\"slider-counter\"),this.prevBtn=document.getElementById(\"slider-prev\"),this.nextBtn=document.getElementById(\"slider-next\"),this.slider=document.getElementById(\"image-slider\"),this.init()}init(){this.prevBtn.addEventListener(\"click\",()=>this.prev()),this.nextBtn.addEventListener(\"click\",()=>this.next()),document.addEventListener(\"keydown\",t=>{this.slider.closest(\"#modal-overlay\")?.classList.contains(\"hidden\")||(t.key===\"ArrowLeft\"&&this.prev(),t.key===\"ArrowRight\"&&this.next())}),this.slider.addEventListener(\"mouseenter\",()=>{this.prevBtn.style.opacity=\"1\",this.nextBtn.style.opacity=\"1\"}),this.slider.addEventListener(\"mouseleave\",()=>{this.prevBtn.style.opacity=\"0\",this.nextBtn.style.opacity=\"0\"})}setImages(t,i=\"\"){this.images=t,this.currentIndex=0,this.images.length!==0&&(this.createThumbnails(),this.mainImage.src=this.images[0],this.mainImage.alt=\"Imagen 1\",this.mainImage.style.opacity=\"1\",this.updateDisplay())}createThumbnails(){this.thumbnailsContainer.innerHTML=\"\",this.images.forEach((t,i)=>{const e=document.createElement(\"img\");e.src=t,e.alt=`Imagen ${i+1}`,e.className=`\n            w-16 h-16 object-cover rounded-lg cursor-pointer transition-all duration-300\n            hover:scale-110 hover:shadow-lg flex-shrink-0\n            ${i===this.currentIndex?\"ring-2 ring-emerald-400 scale-105\":\"opacity-70 hover:opacity-100\"}\n          `,e.addEventListener(\"click\",()=>{this.currentIndex=i,this.updateDisplay()}),this.thumbnailsContainer.appendChild(e)})}updateDisplay(){if(this.images.length===0)return;this.mainImage.style.opacity=\"0\",setTimeout(()=>{this.mainImage.src=this.images[this.currentIndex],this.mainImage.alt=`Imagen ${this.currentIndex+1}`,this.mainImage.style.opacity=\"1\"},150),this.counter.textContent=`${this.currentIndex+1} / ${this.images.length}`;const t=this.thumbnailsContainer.querySelectorAll(\"img\");t.forEach((e,n)=>{n===this.currentIndex?(e.className=e.className.replace(\"opacity-70\",\"\").replace(\"scale-105\",\"\"),e.className+=\"ring-2 ring-emerald-400 scale-105 opacity-100\"):(e.className=e.className.replace(\"ring-2 ring-emerald-400 scale-105\",\"\"),e.className+=\" opacity-70\")});const i=t[this.currentIndex];i&&i.scrollIntoView({behavior:\"smooth\",block:\"nearest\",inline:\"center\"})}prev(){this.currentIndex=this.currentIndex>0?this.currentIndex-1:this.images.length-1,this.updateDisplay()}next(){this.currentIndex=this.currentIndex<this.images.length-1?this.currentIndex+1:0,this.updateDisplay()}}const a=new s;window.imageSlider=a;"]],"assets":["/_astro/1.uKERlV2s.webp","/_astro/3.TJBL_CUN.webp","/_astro/5.Cdzt2piM.webp","/_astro/4.BE2dqD4p.webp","/_astro/6.CqZ_LgFG.webp","/_astro/2.5e628gip.webp","/_astro/contact.CARlUcOF.webp","/_astro/machines.CayvFz_k.webp","/_astro/hero-img.5ecvCsln.webp","/_astro/1.DkKubo0C.webp","/_astro/about2.BBgqb-XJ.webp","/_astro/2.Q3vb12QV.webp","/_astro/3.BlrC8fwj.webp","/_astro/4.BjK6bqmc.webp","/_astro/6.CwvsOQaA.webp","/_astro/5.GTv-mXgr.webp","/_astro/7.BK9ZLiiC.webp","/_astro/8.Cij2bTnj.webp","/_astro/9.sChYjQli.webp","/_astro/10.QSASvndn.webp","/_astro/hero.B5YrwbK5.webp","/_astro/services.rwhrkoA6.webp","/_astro/Projects.C6H3qMX6.webp","/_astro/logo-scroll.B2ZJ1x4x.webp","/_astro/logo.BwlqiFGe.webp","/_astro/contactanos.DmEgCEPB.css","/favicon.svg","/_astro/About.astro_astro_type_script_index_0_lang.DduWpidj.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/Footer.astro_astro_type_script_index_0_lang.CXo6TLdO.js","/_astro/Header.astro_astro_type_script_index_0_lang.nVoJ_U3O.js","/_astro/Hero.astro_astro_type_script_index_0_lang.CF9kPILS.js","/_astro/Hero.astro_astro_type_script_index_0_lang.DAHSkxNZ.js","/_astro/Hero.astro_astro_type_script_index_0_lang.DUIqW-iV.js","/_astro/index.CH_iu5NA.js","/_astro/Modal.astro_astro_type_script_index_0_lang.DdZcqbYi.js","/_astro/Modal.astro_astro_type_script_index_0_lang.DHKRJK2P.js","/_astro/Project.astro_astro_type_script_index_0_lang.LULdBuEM.js","/_astro/ScrollTrigger.C4gmGO9R.js","/_astro/ServiceGrid.astro_astro_type_script_index_0_lang.Boj40ytL.js","/_astro/Services.astro_astro_type_script_index_0_lang.CC9pygX5.js","/contactanos/index.html","/equipos/index.html","/nosotros/index.html","/proyectos/index.html","/servicios/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"YFDDDnUAMg7MmWdP+pf1gA15bAi7z2Zu47khe0JjMlc=","sessionConfig":{"driver":"fs-lite","options":{"base":"D:\\CODE\\WEBs\\geocore-web\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
