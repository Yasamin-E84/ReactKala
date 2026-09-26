export function cleanApiText(value) {
  if (typeof value !== "string") return value;

  // The mock API contains a few Persian strings that were saved as UTF-8
  // bytes interpreted as latin-1. Repair them at the component boundary so
  // the data file can remain untouched.
  if (!/[\u00c2-\u00f4]/.test(value)) return value;

  try {
    const bytes = Uint8Array.from(value, (character) =>
      character.charCodeAt(0),
    );
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return value;
  }
}

export function mobileImagePath(path) {
  if (!path) return "";
  return path.startsWith("./") ? `/${path.slice(2)}` : path;
}

export const MOBILE_ROUTE_EVENT = "reactkala:mobile-route";

export function notifyMobileRoute() {
  window.dispatchEvent(new Event(MOBILE_ROUTE_EVENT));
  window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
}

export function navigateMobile(path, state = {}) {
  window.history.pushState(state, "", path);
  notifyMobileRoute();
}

export function replaceMobile(path, state = {}) {
  window.history.replaceState(state, "", path);
  notifyMobileRoute();
}
