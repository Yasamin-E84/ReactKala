import { useCallback, useEffect, useRef, useState } from "react";
import HeaderBanner from "../HeaderBanner";
import useFetch from "../../Hooks/useFetch";
import MobileCategoryMenu from "./MobileCategoryMenu";
import MobileServices from "./MobileServices";
import MobileLocation from "./MobileLocation";
import MobileSearch from "./MobileSearch";
import { MOBILE_ROUTE_EVENT, replaceMobile } from "./mobileUtils";

export default function MobileHeader() {
  const { data: menuItems } = useFetch("http://localhost:5000/mobileServices");
  const [scrollState, setScrollState] = useState({ pinned: false, hideAddress: false, cropServices: false });
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const frame = useRef();

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const compact = y / maxScroll >= 0.1;
        setScrollState((current) => {
          const next = {
            pinned: y >= 35,
            hideAddress: compact,
            cropServices: compact,
          };
          return current.pinned === next.pinned && current.hideAddress === next.hideAddress && current.cropServices === next.cropServices
            ? current
            : next;
        });
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const syncPath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    window.addEventListener(MOBILE_ROUTE_EVENT, syncPath);
    return () => {
      window.removeEventListener("popstate", syncPath);
      window.removeEventListener(MOBILE_ROUTE_EVENT, syncPath);
    };
  }, []);

  const closeCategories = useCallback(() => {
    if (window.history.state?.mobileCategory) {
      window.history.back();
      return;
    }
    replaceMobile("/", {});
  }, []);

  if (pathname === "/categories" || pathname === "/categories/") {
    return (
      <MobileCategoryMenu
        open
        setOpen={(next) => !next && closeCategories()}
        menuItems={menuItems || []}
      />
    );
  }

  return (
    <>
      <div className="relative h-[35px] overflow-hidden">
        <HeaderBanner />
      </div>
      {scrollState.pinned && (
        <div
          aria-hidden="true"
          className={scrollState.hideAddress ? "h-[133px]" : "h-[169px]"}
        />
      )}
      <header
        className={`${scrollState.pinned ? "fixed inset-x-0 top-0" : "relative"} z-50 w-full bg-white transition-transform duration-300 ease-out ${
          scrollState.cropServices ? "-translate-y-9" : "translate-y-0"
        }`}
        dir="rtl"
      >
        <MobileServices />

        <MobileSearch />

        <div
          className={`overflow-hidden bg-white transition-[max-height,opacity] duration-300 ease-out ${
            scrollState.hideAddress ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
          }`}
        >
          <MobileLocation />
        </div>
      </header>
    </>
  );
}
