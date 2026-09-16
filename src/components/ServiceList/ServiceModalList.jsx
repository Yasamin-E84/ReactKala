import { useEffect } from "react";
import useFetch from "../Hooks/useFetch";

const ServiceModalList = ({ isOpen, onClose }) => {
  const { data: services, error: servicesError } = useFetch(
    "http://localhost:5000/listModal",
  );

  const { data: modalServices, error: modalError } = useFetch(
    "http://localhost:5000/modalService",
  );

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-9999
        flex
        items-center
        justify-center
        bg-black/35
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          flex
          lg:h-[92vh]
          lg:max-w-237.5
          w-screen
          h-screen
          flex-col

          overflow-hidden

          rounded-2xl
          bg-white

          shadow-[0_20px_60px_rgba(0,0,0,0.20)]
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            h-16.25
            shrink-0
            items-center
            justify-between

            border-b
            border-[#e0e0e2]

            bg-white

            px-5
          "
        >
          <h2 className="text-[16px] font-bold text-[#23254e]">
            خدمات دیجی‌کالا
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-full

              text-[#424750]

              transition
              hover:bg-[#f0f0f1]
            "
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div
          className="
            flex-1
            overflow-y-auto

            px-5
            pb-6
            pt-7

            [scrollbar-width:thin]
          "
        >
          {/* TOP SERVICES */}
          {!servicesError && services?.length > 0 && (
            <div
              className="
                grid
                grid-cols-4
                gap-x-4
                gap-y-6

                sm:grid-cols-6
              "
            >
              {services.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2

                    text-center
                  "
                >
                  <img
                    src={item.icon}
                    alt={item.text}
                    className="
                      h-[52px]
                      w-[52px]
                      object-contain
                    "
                  />

                  <span
                    className="
                      max-w-[90px]
                      text-[11px]
                      leading-5
                      text-[#3f4064]
                    "
                  >
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* SECTION TITLE */}
          <h3
            className="
              mb-4
              mt-8
              text-[14px]
              font-bold
              text-[#81858b]
            "
          >
            سرویس‌های گروه دیجی‌کالا
          </h3>

          {/* LARGE SERVICE CARDS */}
          {modalError ? (
            <div className="py-10 text-center text-red-500">
              دریافت خدمات با خطا مواجه شد
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-3

                md:grid-cols-2
              "
            >
              {modalServices?.map((item, index) => (
                <a
                  key={`${item.title}-${index}`}
                  href={item.link}
                  className="
                    group

                    flex
                    min-h-[78px]
                    items-center
                    justify-between

                    rounded-[15px]
                    border
                    border-[#e0e0e2]

                    bg-white

                    px-4
                    py-3

                    transition

                    hover:bg-[#fafafa]
                  "
                >
                  {/* RIGHT SIDE */}
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={item.pic.replace("./", "/")}
                      alt={item.title}
                      className="
                        h-[52px]
                        w-[52px]
                        shrink-0
                        rounded-full
                        object-contain
                      "
                    />

                    <div className="min-w-0">
                      <h4
                        className="
                          text-[14px]
                          font-bold
                          leading-6
                          text-[#3f4064]
                        "
                      >
                        {item.title}
                      </h4>

                      {item.text && (
                        <p
                          className="
                            mt-1
                            line-clamp-2
                            text-[11px]
                            leading-5
                            text-[#81858b]
                          "
                        >
                          {item.text}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* LEFT ARROW */}
                  <div
                    className="
                      mr-3
                      shrink-0

                      text-[#a1a3a8]

                      transition-transform

                      group-hover:-translate-x-1
                    "
                  >
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 5L8 12L15 19"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceModalList;
