import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useFetch from "../../Hooks/useFetch";
import MobileServices from "./MobileServices";
import MobileSearch from "./MobileSearch";
import { ChevronIcon } from "./MobileIcons";
import { cleanApiText } from "./mobileUtils";

function CategoryIcon({ id, className = "" }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  let shape;
  switch (id) {
    case "mobile":
      shape = <><rect x="7" y="3" width="10" height="18" rx="2" {...common} /><path d="M10.5 17.5h3" {...common} /></>;
      break;
    case "laptop":
      shape = <><rect x="5" y="5" width="14" height="10" rx="1" {...common} /><path d="M3 18h18M9 18h6" {...common} /></>;
      break;
    case "digital-products":
      shape = <><rect x="4" y="4" width="6" height="6" rx="1" {...common} /><rect x="14" y="4" width="6" height="6" rx="1" {...common} /><rect x="4" y="14" width="6" height="6" rx="1" {...common} /><circle cx="17" cy="17" r="3" {...common} /></>;
      break;
    case "home-kitchen":
      shape = <><path d="m3 11 9-7 9 7" {...common} /><path d="M5.5 9.5V20h13V9.5M10 20v-6h4v6" {...common} /></>;
      break;
    case "home-appliances":
      shape = <><rect x="5" y="3" width="14" height="18" rx="2" {...common} /><path d="M5 10h14M9 6h2M9 15a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" {...common} /></>;
      break;
    case "beauty-health":
      shape = <><path d="M12 20S4 15.6 4 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5C20 15.6 12 20 12 20Z" {...common} /></>;
      break;
    case "fashion":
      shape = <><path d="m8 4-5 3 2 4 3-1v10h8V10l3 1 2-4-5-3c-.5 2-1.9 3-4 3S8.5 6 8 4Z" {...common} /></>;
      break;
    case "gold-silver":
      shape = <><path d="m5 9 3-5h8l3 5-7 11L5 9Z" {...common} /><path d="M5 9h14M8 4l4 5 4-5" {...common} /></>;
      break;
    case "automotive":
      shape = <><path d="m5 15 1.8-6h10.4l1.8 6v4H5v-4Z" {...common} /><path d="M3 13h2m14 0h2M8 19v2m8-2v2M8 15h.01M16 15h.01" {...common} /></>;
      break;
    case "medical-health":
      shape = <><path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5V4Z" {...common} /></>;
      break;
    case "tools-equipment":
      shape = <><path d="M14 6a4 4 0 0 0-5-2l3 3-3 3-3-3a4 4 0 0 0 5 5l7 7 2-2-7-7a4 4 0 0 0 1-4Z" {...common} /></>;
      break;
    case "books-art":
      shape = <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" {...common} /></>;
      break;
    case "sports-travel":
      shape = <><circle cx="12" cy="12" r="9" {...common} /><path d="m9 9 3-2 3 2-1 4h-4L9 9Zm-4 5 5-1m4 0 5 1M8 5l1 4m7-4-1 4" {...common} /></>;
      break;
    case "gift-card":
      shape = <><rect x="3" y="8" width="18" height="12" rx="1" {...common} /><path d="M12 8v12M3 12h18M12 8H8.5A2.5 2.5 0 1 1 11 5.5L12 8Zm0 0h3.5A2.5 2.5 0 1 0 13 5.5L12 8Z" {...common} /></>;
      break;
    case "supermarket":
      shape = <><path d="M3 4h2l2.2 10.5h9.9L20 8H6" {...common} /><circle cx="9" cy="19" r="1.5" {...common} /><circle cx="17" cy="19" r="1.5" {...common} /></>;
      break;
    case "kids-baby-toys":
      shape = <><circle cx="8" cy="8" r="3" {...common} /><circle cx="16" cy="8" r="3" {...common} /><circle cx="12" cy="13" r="7" {...common} /><path d="M9.5 14.5c1.7 1.3 3.3 1.3 5 0" {...common} /></>;
      break;
    case "local-products":
      shape = <><path d="M19 4C10 4 5 8 5 15c0 3 2 5 5 5 7 0 9-7 9-16Z" {...common} /><path d="M5 20c2-6 6-9 11-12" {...common} /></>;
      break;
    default:
      shape = <><circle cx="8" cy="9" r="2.2" {...common} /><circle cx="16" cy="9" r="2.2" {...common} /><circle cx="12" cy="5" r="2.2" {...common} /><path d="M7 17c0-3 2.2-5 5-5s5 2 5 5c0 2-2 3-5 3s-5-1-5-3Z" {...common} /></>;
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>{shape}</svg>;
}

function ProductFallbackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none text-[#424750]">
      <rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Section({ sectionKey, title, items = [], opened, onToggle }) {
  const isOpen = opened === sectionKey;
  const displayItems = [
    ...items,
    { title: "همه کالاها", url: items[0]?.url || "#", isAll: true },
  ];

  return (
    <div className="border-b border-[#f0f0f1]">
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : sectionKey)}
        className="flex min-h-[50px] w-full items-center justify-between gap-3 py-2 text-right text-[12px] font-bold text-[#0c0c0c] active:bg-[#fafafa]"
        aria-expanded={isOpen}
      >
        <span>{cleanApiText(title)}</span>
        <ChevronIcon className={`h-5 w-5 shrink-0 text-[#424750] ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="overflow-hidden">
          <div className="flex gap-5 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {displayItems.map((item, index) => (
              <a
                key={`${item.url || item.title}-${index}`}
                href={item.url || "#"}
                className="flex w-[82px] shrink-0 flex-col items-center gap-2 text-center active:opacity-70"
              >
                <span className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full bg-[#f0f0f1]">
                  {item.image || item.img ? (
                    <img src={item.image || item.img} alt="" className="h-full w-full object-contain" />
                  ) : item.isAll ? (
                    <ProductFallbackIcon />
                  ) : (
                    <CategoryIcon id="digital-products" className="h-7 w-7 text-[#62666d]" />
                  )}
                </span>
                <span className="line-clamp-2 text-[10px] leading-4 text-[#424750]">
                  {cleanApiText(item.title)}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MenuBottomNav({ items = [], onClose }) {
  const destinations = {
    "خانه": "/",
    "دسته‌بندی": "/categories/",
    "سبد خرید": "/checkout/cart/",
    "مگنت": "/magnet/feed/?activeTab=community",
    "دیجی‌کالای من": "/users/login/",
  };

  return (
    <nav className="relative z-20 flex h-[55px] shrink-0 items-center border-t border-[#e0e0e2] bg-white" dir="rtl" aria-label="منوی اصلی">
      <div className="flex h-full w-full items-center">
        {items.map((item) => {
          const originalLabel = cleanApiText(item.text);
          const label = originalLabel === "مگنت" ? "پرس‌وجو" : originalLabel;
          const isCategory = originalLabel === "دسته‌بندی";
          const isHome = originalLabel === "خانه";
          return (
            <a
              key={originalLabel}
              href={destinations[originalLabel] || item.href || "#"}
              onClick={isHome ? (event) => {
                event.preventDefault();
                onClose();
              } : isCategory ? (event) => event.preventDefault() : undefined}
              className={`flex h-full flex-1 flex-col items-center justify-center gap-px text-[9px] active:bg-[#fafafa] ${isCategory ? "font-bold text-[#424750]" : "text-[#a1a3a8]"}`}
              aria-current={isCategory ? "page" : undefined}
            >
              <img src={item.icon} alt="" className={`h-6 w-6 ${isCategory ? "opacity-100" : "opacity-60"}`} />
              <span className="leading-4">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default function MobileCategoryMenu({ open, setOpen, menuItems = [] }) {
  const { data, error } = useFetch("http://localhost:5000/mobileCategory");
  const [activeId, setActiveId] = useState(null);
  const [opened, setOpened] = useState(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const categories = data || [];
  const category = categories.find((item) => item.id === activeId) || categories[0];

  const selectCategory = (item) => {
    if (item.id === activeId) return;
    setActiveId(item.id);
    setOpened(null);
    mainRef.current?.scrollTo({ top: 0 });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60000] flex h-[100dvh] w-screen flex-col overflow-hidden bg-white xl:hidden"
      dir="rtl"
      aria-label="دسته‌بندی محصولات"
    >
      <header className="relative z-20 h-[108px] shrink-0 bg-white">
        <MobileServices compact />
        <MobileSearch categoryMode onBack={() => setOpen(false)} />
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[89px] shrink-0 overflow-y-auto bg-[#f0f0f1] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="گروه‌های کالا">
          {categories.map((item, index) => {
            const selected = category?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectCategory(item)}
                className={`relative flex w-full flex-col items-center justify-center gap-1 px-1 py-2 text-center ${index === 0 ? "min-h-[62px]" : "min-h-[81px]"} ${
                  selected ? "bg-white text-[#ef4056]" : "border-b border-[#e0e0e2] text-[#62666d] active:bg-[#e6e6e8]"
                }`}
                aria-pressed={selected}
              >
                <CategoryIcon id={item.id} className="h-[22px] w-[22px]" />
                <span className="line-clamp-2 text-[9px] leading-[14px]">{cleanApiText(item.title)}</span>
              </button>
            );
          })}
        </aside>

        <main ref={mainRef} className="min-w-0 flex-1 overflow-y-auto bg-white px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-live="polite">
          {!data && !error && (
            <div className="flex h-full items-center justify-center">
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-[#e0e0e2] border-t-[#ef4056]" />
            </div>
          )}

          {error && (
            <div className="flex h-full items-center justify-center px-5 text-center text-[12px] text-[#ef4056]">
              دریافت دسته‌بندی‌ها با مشکل روبه‌رو شد.
            </div>
          )}

          {category && (
            <div key={category.id}>
              <a
                href={category.topLink?.url || "#"}
                className="flex min-h-[62px] items-center gap-1 text-[11px] font-bold text-[#3f5f8a] active:opacity-70"
              >
                <span>{cleanApiText(category.topLink?.title)}</span>
                <ChevronIcon className="h-4 w-4 rotate-90" />
              </a>

              {category.columns?.map((column, columnIndex) => {
                if (column.type === "simple") {
                  return (
                    <Section
                      key={`${category.id}-${columnIndex}`}
                      sectionKey={`${columnIndex}:simple`}
                      title={column.title}
                      items={column.items}
                      opened={opened}
                      onToggle={setOpened}
                    />
                  );
                }

                const sections = column.sections || [];
                const showGroupTitle = sections.length > 1 && cleanApiText(column.title) !== cleanApiText(sections[0]?.title);
                return (
                  <div key={`${category.id}-${columnIndex}`}>
                    {showGroupTitle && (
                      <h2 className="flex min-h-[32px] items-center pb-1 text-[13px] font-bold text-[#0c0c0c]">{cleanApiText(column.title)}</h2>
                    )}
                    {sections.map((section, sectionIndex) => (
                      <Section
                        key={`${category.id}-${columnIndex}-${sectionIndex}`}
                        sectionKey={`${columnIndex}:${sectionIndex}`}
                        title={section.title || column.title}
                        items={section.items}
                        opened={opened}
                        onToggle={setOpened}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <MenuBottomNav items={menuItems} onClose={() => setOpen(false)} />
    </div>,
    document.body,
  );
}
