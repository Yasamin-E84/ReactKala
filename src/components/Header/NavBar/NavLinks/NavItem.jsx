import { useState } from "react";

const NavItem = ({ item }) => {
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

  return (
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
      <a href={item.link} className="flex justify-center items-center gap-2">
        <img src={item.img} alt="" className="w-5" />

        <span className="  text-xs text-[#a8a7aa]">{item.title}</span>
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
  );
};
export default NavItem;