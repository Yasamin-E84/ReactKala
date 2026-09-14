import { useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import NavItem from "./NavItem";

const NavLinks = () => {
  const { data, error } = useFetch("http://localhost:5000/navbar");
  const [side, setSide] = useState("right");

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;

    if (mouseX < rect.width / 2) {
      setSide("right");
    } else {
      setSide("left");
    }
  };
  if (error) {
    return (
      <div className="h-7.5 px-3 rounded-md border border-red-200 bg-red-50 text-red-600 text-xs flex items-center">
        Navbar failed to load
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center gap-6">
      {data?.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}

      <hr className="h-4 border-r border-[#e0e0e2] mb-1" />
      <div
        onMouseEnter={handleMouseEnter}
        className="
        group/navItem
        flex
        flex-col
        justify-center
        gap-2
         
      "
      >
        <a href="#" className="flex justify-center items-center gap-2">
          <span className="  text-xs text-[#a8a7aa]">
            در دیجی‌کالا بفروشید!
          </span>
        </a>

        <div
          className={`
          h-0.5
          w-3
          opacity-0

          bg-[#ed1944]
          rounded-full

          group-hover/navItem:w-full
          group-hover/navItem:opacity-100

          transition-all
          duration-300
          ease-out

          ${side === "right" ? "self-end" : "self-start"}
        `}
        />
      </div>
    </div>
  );
};

export default NavLinks;
