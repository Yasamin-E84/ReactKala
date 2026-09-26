import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useFetch from "../../Hooks/useFetch";
import { SearchIcon } from "./MobileIcons";
import { cleanApiText, notifyMobileRoute } from "./mobileUtils";

function CameraIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 8.5C4 7.67 4.67 7 5.5 7H8l1.2-2h5.6L16 7h2.5c.83 0 1.5.67 1.5 1.5V18c0 .83-.67 1.5-1.5 1.5h-13C4.67 19.5 4 18.83 4 18V8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BackIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 20h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileSearch({ categoryMode = false, onBack }) {
  const [isOpen, setIsOpen] = useState(() => window.location.hash === "#search");
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const closeTimer = useRef();
  const { data: hotSearches, error } = useFetch("http://localhost:5000/HotSearh");

  const openSearch = () => {
    clearTimeout(closeTimer.current);
    if (window.location.hash !== "#search") {
      window.history.pushState({ ...window.history.state, mobileSearch: true }, "", `${window.location.pathname}${window.location.search}#search`);
      notifyMobileRoute();
    }
    setIsOpen(true);
  };

  const closeSearch = () => {
    setIsMounted(false);
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      if (window.location.hash === "#search") {
        if (window.history.state?.mobileSearch) window.history.back();
        else window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
      }
    }, 300);
  };

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === "#search") {
        clearTimeout(closeTimer.current);
        setIsOpen(true);
      } else {
        setIsMounted(false);
        closeTimer.current = setTimeout(() => setIsOpen(false), 300);
      }
    };
    window.addEventListener("popstate", syncHash);
    return () => {
      clearTimeout(closeTimer.current);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => setIsMounted(true));

    const handleKey = (event) => {
      if (event.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const searchBar = (
    <button
      type="button"
      onClick={openSearch}
      className={`flex min-w-0 flex-1 items-center rounded-full text-right transition-colors active:bg-[#e5e5e7] ${
        categoryMode
          ? "h-[40px] border border-[#e0e0e2] bg-white px-3"
          : "h-[43px] bg-[#f0f0f1] px-3"
      }`}
      aria-label="جستجو در دیجی‌کالا"
    >
      <SearchIcon className="h-[22px] w-[22px] shrink-0 text-[#a1a3a8]" />
      <span className="mr-3 flex min-w-0 flex-1 items-center gap-1 overflow-hidden whitespace-nowrap text-[13px]">
        <span className="text-[#81858b]">جستجو در</span>
        <strong className="text-[#ef4056]">دیجی‌کالا</strong>
      </span>
      <CameraIcon className="h-[22px] w-[22px] shrink-0 text-[#7c5cff]" />
    </button>
  );

  return (
    <>
      <div className={`flex w-full items-center bg-white ${categoryMode ? "h-[68px] gap-1 px-4" : "h-[58px] gap-3 px-4"}`} dir="rtl">
        {categoryMode && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-9 shrink-0 items-center justify-center rounded-full text-[#23254e] active:bg-[#f0f0f1]"
            aria-label="بازگشت"
          >
            <BackIcon className="h-6 w-6" />
          </button>
        )}

        {searchBar}

        {!categoryMode && (
          <a
            href="#notifications"
            className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#e0e0e2] bg-white text-[#3f4064] active:bg-[#f5f5f5]"
            aria-label="اعلان‌ها"
          >
            <BellIcon />
          </a>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[70000] h-[100dvh] w-screen overflow-y-auto bg-white transition-[transform,opacity] duration-300 ease-out ${
              isMounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-label="جستجو"
          >
            <div className="sticky top-0 z-10 flex h-[58px] items-center gap-2 bg-white px-4">
              <button
                type="button"
                onClick={closeSearch}
                className="flex h-11 w-9 shrink-0 items-center justify-center rounded-full text-[#23254e] active:bg-[#f0f0f1]"
                aria-label="بازگشت"
              >
                <BackIcon className="h-6 w-6" />
              </button>

              <label className="flex h-[42px] min-w-0 flex-1 items-center rounded-full border border-[#e0e0e2] bg-white px-3">
                <SearchIcon className="h-[22px] w-[22px] shrink-0 text-[#81858b]" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  placeholder="جستجو در همه کالاها"
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#3f4064] outline-none placeholder:text-[#a1a3a8]"
                />
                <CameraIcon className="h-[22px] w-[22px] shrink-0 text-[#7c5cff]" />
              </label>
            </div>

            {!query && !error && hotSearches?.length > 0 && (
              <section className="px-4 pt-2">
                <h2 className="text-[14px] font-bold text-[#0c0c0c]">جستجوهای پرطرفدار</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hotSearches.map((item) => (
                    <button
                      key={item.id ?? item.title}
                      type="button"
                      onClick={() => setQuery(cleanApiText(item.title))}
                      className="flex items-center gap-1.5 rounded-full border border-[#e0e0e2] bg-white px-3 py-[7px] text-[12px] text-[#3f4064] active:bg-[#f5f5f5]"
                    >
                      <span>{cleanApiText(item.title)}</span>
                      <span aria-hidden="true" className="text-base">↖</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {query && (
              <div className="flex flex-col items-center px-6 pt-20 text-center">
                <SearchIcon className="h-10 w-10 text-[#a1a3a8]" />
                <p className="mt-4 text-[13px] text-[#62666d]">
                  نتایج جستجو برای «{query}» پس از اتصال به API نمایش داده می‌شود.
                </p>
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
