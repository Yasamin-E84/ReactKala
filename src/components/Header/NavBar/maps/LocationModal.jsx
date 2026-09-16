import { useEffect } from "react";
import { createPortal } from "react-dom";
import LocationMap from "./locationMap";

export default function LocationModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropMouseDown = (event) => {
    // Only close if they actually clicked the dark background.
    // Clicking inside the modal won't close it.
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onMouseDown={handleBackdropMouseDown}
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/35
        px-3 py-4
        backdrop-blur-[1px]
      "
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="
          flex
          h-[620px]
          max-h-[calc(100dvh-32px)]
          w-full
          max-w-[780px]
          flex-col
          overflow-hidden
          rounded-[16px]
          bg-white
          shadow-[0_20px_70px_rgba(0,0,0,0.20)]

          sm:rounded-[18px]
        "
      >
        {/* HEADER */}
        <header className="shrink-0 px-5 pt-5 sm:px-5">
          <div className="flex min-h-[70px] items-start justify-between">
            {/* Text is on the right in RTL */}
            <div className="pr-1 text-right">
              <h2
                id="location-modal-title"
                className="text-[17px] font-bold leading-7 text-[#111827]"
              >
                انتخاب موقعیت مکانی
              </h2>

              <p className="mt-1 text-[13px] leading-6 text-[#9CA3AF]">
                برای تحویل به‌موقع سفارش، موقعیت را دقیق انتخاب کنید.
              </p>
            </div>

            {/* X visually on the left */}
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="
                -ml-1
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                text-[#5F6B7A]
                transition
                hover:bg-gray-100
                hover:text-gray-900
              "
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="h-px w-full bg-[#E5E7EB]" />
        </header>

        {/* MAP AREA */}
        <div className="min-h-0 flex-1 px-5 pt-5">
          <LocationMap onConfirm={onConfirm} />
        </div>
      </section>
    </div>,
    document.body,
  );
}
