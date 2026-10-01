const baseUrl = import.meta.env.BASE_URL;

/** Resolve a public asset without losing the GitHub Pages project prefix. */
export function assetPath(path) {
  if (!path || typeof path !== "string") return path;
  if (/^(?:[a-z][a-z\d+.-]*:|#|data:)/i.test(path)) return path;
  if (path.startsWith(baseUrl)) return path;

  const publicPath = path.startsWith("./src/assets/images/")
    ? `images/${path.slice("./src/assets/images/".length)}`
    : path.replace(/^\/+/, "");

  return `${baseUrl}${publicPath}`;
}

/** Build an internal application URL that works at localhost and on GitHub Pages. */
export function appPath(path = "/") {
  if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(path)) return path;
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

/** Convert a browser URL back to an app-relative route for route checks. */
export function routePathname(pathname = window.location.pathname) {
  if (baseUrl === "/") return pathname;

  const baseWithoutTrailingSlash = baseUrl.replace(/\/$/, "");
  if (pathname === baseWithoutTrailingSlash) return "/";
  if (pathname.startsWith(baseUrl)) return `/${pathname.slice(baseUrl.length)}`;
  return pathname;
}
