import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useFetch from "../../Hooks/useFetch";

export default function MobileSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: hotSearches,
    error,
  } = useFetch("http://localhost:5000/HotSearh");

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* NORMAL HEADER SEARCH */}
      <div className="flex h-[58px] w-full items-center gap-3 bg-white px-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            flex
            h-[43px]
            min-w-0
            flex-1
            items-center
            rounded-full
            bg-[#f0f0f1]
            px-3
          "
        >
          {/* magnifier */}
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-[#a1a3a8]"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <div className="mr-3 flex min-w-0 flex-1 items-center gap-1 text-[13px]">
            <span className="text-[#81858b]">
              جستجو در
            </span>

            <span className="font-bold text-[#ef4056]">
              دیجی‌کالا
            </span>
          </div>

          {/* camera */}
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-[#7c5cff]"
          >
            <path
              d="M4 8.5C4 7.67 4.67 7 5.5 7H8L9.2 5H14.8L16 7H18.5C19.33 7 20 7.67 20 8.5V18C20 18.83 19.33 19.5 18.5 19.5H5.5C4.67 19.5 4 18.83 4 18V8.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />

            <circle
              cx="12"
              cy="13"
              r="3.2"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </button>

        {/* bell */}
        <button
          type="button"
          className="
            flex
            h-[43px]
            w-[43px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#e0e0e2]
            bg-white
            text-[#3f4064]
          "
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8C6 15 3 16 3 16H21C21 16 18 15 18 8Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 20H14"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            dir="rtl"
            className="
              fixed
              inset-0
              z-[50000]
              h-[100dvh]
              w-screen
              overflow-y-auto
              bg-white
            "
          >
            {/* TOP SEARCH AREA */}
            <div className="flex items-center gap-2 px-3 pt-3">
              {/* back */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  flex
                  h-11
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  text-black
                "
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="
                  flex
                  h-[46px]
                  min-w-0
                  flex-1
                  items-center
                  rounded-full
                  border
                  border-[#e0e0e2]
                  bg-white
                  px-3
                "
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[#81858b]"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M16 16L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>

                <input
                  autoFocus
                  type="text"
                  placeholder="جستجو در همه کالاها"
                  className="
                    h-full
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    text-[13px]
                    text-[#3f4064]
                    outline-none
                    placeholder:text-[#a1a3a8]
                  "
                />

                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-[#7c5cff]"
                >
                  <path
                    d="M4 8.5C4 7.67 4.67 7 5.5 7H8L9.2 5H14.8L16 7H18.5C19.33 7 20 7.67 20 8.5V18C20 18.83 19.33 19.5 18.5 19.5H5.5C4.67 19.5 4 18.83 4 18V8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="3.2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </div>
            </div>

            {/* POPULAR SEARCHES */}
            {!error && hotSearches?.length > 0 && (
              <div className="px-4 pt-5">
                <h2 className="text-[14px] font-bold text-[#0c0c0c]">
                  جستجوهای پرطرفدار
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {hotSearches.map((item) => (
                    <button
                      key={item.id ?? item.title}
                      type="button"
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-[#e0e0e2]
                        bg-white
                        px-3
                        py-[7px]
                        text-[12px]
                        text-[#3f4064]
                      "
                    >
                      <span>{item.title}</span>

                      <span className="text-base">
                        ↗
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}