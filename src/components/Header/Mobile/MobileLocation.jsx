import { useState } from "react";
import MobileLocationModal from "./MobileLocationModal";
import { ChevronIcon } from "./MobileIcons";

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px] text-[#f57f17]">
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function MobileLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-full items-center gap-2 bg-white px-4 text-right active:bg-[#fafafa]"
      >
        <PinIcon />
        <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-[#7c4d00]">
          {selectedLocation ? "موقعیت مکانی انتخاب شد" : "انتخاب آدرس"}
        </span>
        <ChevronIcon className="h-[19px] w-[19px] rotate-90 text-[#a85d00]" />
      </button>

      <MobileLocationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={(location) => {
          setSelectedLocation(location);
          setIsOpen(false);
        }}
      />
    </>
  );
}
