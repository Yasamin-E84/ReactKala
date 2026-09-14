import { useRef, useState } from "react";

import MegaMenu from "./MegaMenu/MegaMenu";
import NavLinks from "./NavLinks/NavLinks";
import menu from "../../../assets/images/Header/Mega/Mega.svg";
import AddressPicker from "./maps/AddressPicker";

const NavBarConsole = ({ className = "" }) => {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [underlineSide, setUnderlineSide] = useState("right");

  const closeTimer = useRef(null);

  const openMegaMenu = (e) => {
    clearTimeout(closeTimer.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    setUnderlineSide(mouseX < rect.width / 2 ? "right" : "left");

    setIsMegaOpen(true);
  };

  const keepMegaMenuOpen = () => {
    clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);

    closeTimer.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 120);
  };

  return (
    <div className={`relative flex justify-between items-center pt-2 px-4 max-w-[2400px] min-w-[1400px] w-[95%] absolute ${className}`}>
      <div className="flex justify-between items-center w-full">
        {/* CATEGORY AREA */}
        <div className="flex justify-center items-center">
          <div className="relative w-fit px-4 z-[230]">
            {/* ONLY THIS CAN OPEN THE MENU */}
            <div
              onMouseEnter={openMegaMenu}
              onMouseLeave={scheduleClose}
              className="
               
              flex
              flex-col
              justify-center
              gap-2
            "
            >
              <div
                className="
                text-[#2b2b2b]
                font-medium
                text-nowrap
                text-[14px]
                flex
                justify-center
                items-center
                gap-1
                w-fit
                cursor-pointer
              "
              >
                <img src={menu} alt="" className="w-5 h-5" />

                <span className="">دسته‌بندی کالاها</span>
              </div>

              {/* RED UNDERLINE */}
              <div
                className={`
                h-0.5
                rounded-full
                bg-[#ed1944]

                transition-all
                duration-300
                ease-out

                ${isMegaOpen ? "w-full opacity-100" : "w-3 opacity-0"}

                ${underlineSide === "right" ? "self-end" : "self-start"}
              `}
              />
            </div>

            {/* MEGA MENU */}
            <MegaMenu
              isOpen={isMegaOpen}
              onMouseEnter={keepMegaMenuOpen}
              onMouseLeave={scheduleClose}
            />
          </div>
          <NavLinks />
        </div>
        <AddressPicker />
      </div>

      {/* PAGE OVERLAY */}
      <div
        className={`
          absolute
          top-full
          left-1/2
          -translate-x-1/2

          w-screen
          h-screen

          bg-black/30
          z-[205]

          pointer-events-none
          transition-opacity
          duration-300
          ease-out

          ${isMegaOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />
    </div>
  );
};

export default NavBarConsole;
