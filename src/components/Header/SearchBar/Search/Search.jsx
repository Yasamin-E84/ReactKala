import { useState } from "react";
import SearchFocused from "./SearchFocused";
import CoverScreen from "../../../CoverScreen/CoverScreen";

const Search = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative min-w-150 min-h-10 z-50">
      {/* Normal search */}
      <div
        className={`
          bg-[#f0f0f1]
          flex justify-start items-center gap-4
          rounded-full min-w-150 py-2 px-4
          group
          transition-all duration-300 ease-out

          ${focused ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="#a2a4a9"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="جستجو"
          className="w-full h-full rounded-full outline-none border-none placeholder:  placeholder:text-xs pb-2 placeholder:text-[#b5acb2] placeholder:font-bold"
          onFocus={() => setFocused(true)}
        />

        <div className="text-xs text-[#8b8b8b] font-bold bg-[#d8d8d8] py-1 px-2 rounded-sm group-hover:block hidden absolute left-4">
          Ctrl+K
        </div>
      </div>

      {/* Popup */}
      <div
        className={`
          absolute -top-2 -right-2
          transition-all duration-300 ease-out
          origin-top-right
z-40
          ${
            focused
              ? "opacity-100  pointer-events-auto"
              : "opacity-0  pointer-events-none"
          }
        `}
      >
        <SearchFocused onClose={() => setFocused(false)} />
      </div>

      {/* Background cover */}
      <div
        className={`
          transition-opacity duration-300
          ${
            focused
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        {focused && <CoverScreen onClose={() => setFocused(false)} />}
      </div>
    </div>
  );
};

export default Search;
