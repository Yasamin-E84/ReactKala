import { useState } from "react";
import LocationModal from "./LocationModal";
import useAddress from "../../../../Context/useAddress";

export default function AddressPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedAddress, setSelectedAddress } = useAddress();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-orange-50 px-4 text-[13px] font-medium text-orange-600 transition hover:bg-orange-100 active:scale-[0.98] -mt-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 10C20 15 12 22 12 22C12 22 4 15 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>

        <span className="text-nowrap">
          {selectedAddress ? "موقعیت انتخاب شده" : "انتخاب آدرس"}
        </span>
      </button>

      <LocationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={(location) => {
          setSelectedAddress(location);
          setIsOpen(false);
        }}
      />
    </>
  );
}
