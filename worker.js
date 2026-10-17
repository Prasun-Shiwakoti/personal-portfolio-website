// One Worker answers all three addresses. The subdomain the visitor typed picks
// a folder in sites/, so each version keeps its own files at its own root.
//   prasunshiwakoti.com.np                → sites/main
//   formal-version.prasunshiwakoti.com.np → sites/formal
//   game-version.prasunshiwakoti.com.np   → sites/game
// Anything a site doesn't have itself (icons, profile photos) comes from sites/shared.

const SITES = { "formal-version": "formal", "game-version": "game" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const site = SITES[url.hostname.split(".")[0]] || "main";
    const path = url.pathname.endsWith("/") ? url.pathname + "index.html" : url.pathname;

    for (const folder of [site, "shared"]) {
      const res = await env.ASSETS.fetch(new Request(new URL(`/${folder}${path}`, url), request));
      if (res.status !== 404) return res;
    }

    // every site is a single page, so a stray link goes back to the start
    if ((request.headers.get("Accept") || "").includes("text/html")) return Response.redirect(new URL("/", url), 302);
    return new Response("Not found", { status: 404 });
  },
};
