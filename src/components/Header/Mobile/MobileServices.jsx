import useFetch from "../../Hooks/useFetch";
import { cleanApiText, mobileImagePath } from "./mobileUtils";

export default function MobileServices({ compact = false }) {
  const { data: services, error } = useFetch("http://localhost:5000/services");

  if (error || !services) return null;

  return (
    <div
      className={`w-full overflow-x-auto overflow-y-hidden border-b border-[#f0f0f1] bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        compact ? "py-[2px]" : "py-[4px]"
      }`}
      dir="rtl"
      role="tablist"
      aria-label="سرویس‌های دیجی‌کالا"
    >
      <div className="flex w-max min-w-full items-stretch gap-[7px] px-[8px]">
        {services.map((item) => {
          const isFirst = Number(item.id) === 1;
          const title = cleanApiText(item.Stitle || "");

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={Boolean(item.active)}
              aria-label={title || "همه سرویس‌ها"}
              className={`flex shrink-0 flex-col items-center justify-center rounded-[8px] border transition-all duration-200 active:scale-[0.97] ${
                compact
                  ? `${isFirst ? "w-[42px]" : "w-[68px]"} h-[36px]`
                  : `${isFirst ? "w-[48px]" : "w-[66px]"} h-[66px]`
              } ${
                item.active
                  ? "border-[#e6123d] bg-[#e6123d] shadow-[0_2px_7px_rgba(225,18,61,0.15)]"
                  : "border-[#e0e0e2] bg-white"
              }`}
            >
              {(!compact || isFirst) && (
                <img
                  src={mobileImagePath(item.Simg)}
                  alt=""
                  className={
                    compact
                      ? "h-6 w-6 object-contain"
                      : `object-contain ${
                          isFirst ? "h-[27px] w-[27px]" : "h-[34px] w-[34px]"
                        }`
                  }
                />
              )}

              {title && (
                <span
                  className={`max-w-full truncate px-1 text-center font-medium ${
                    compact ? "text-[10px] leading-[13px]" : "mt-[3px] text-[10px] leading-[14px]"
                  } ${item.active ? "text-white" : "text-[#3f4064]"}`}
                >
                  {title}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
