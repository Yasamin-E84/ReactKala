import useFetch from "../../Hooks/useFetch";
import { cleanApiText, navigateMobile } from "./mobileUtils";

const destinations = {
  "خانه": "/",
  "دسته‌بندی": "/categories/",
  "سبد خرید": "/checkout/cart/",
  "مگنت": "/magnet/feed/?activeTab=community",
  "دیجی‌کالای من": "/users/login/",
};

export default function MobileBottomNav() {
  const { data } = useFetch("http://localhost:5000/mobileServices");

  if (!data) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[100] flex h-[55px] w-full items-center border-t border-[#e0e0e2] bg-white lg:hidden"
      dir="rtl"
      aria-label="منوی اصلی"
    >
      {data.map((item) => {
        const originalLabel = cleanApiText(item.text);
        const label = originalLabel === "مگنت" ? "پرس‌وجو" : originalLabel;
        const isCategory = originalLabel === "دسته‌بندی";
        const isHome = originalLabel === "خانه";
        const active = isHome;
        const href = destinations[originalLabel] || item.href || "#";

        return (
          <a
            key={originalLabel}
            href={href}
            onClick={isCategory ? (event) => {
              event.preventDefault();
              navigateMobile("/categories/", { mobileCategory: true, scrollY: window.scrollY });
            } : undefined}
            className={`flex h-full flex-1 flex-col items-center justify-center gap-px active:bg-[#fafafa] ${
              active ? "font-bold text-[#424750]" : "text-[#a1a3a8]"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <img src={item.icon} alt="" className={`h-6 w-6 ${active ? "opacity-100" : "opacity-60"}`} />
            <span className="text-[9px] leading-4">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
