import { useEffect, useRef, useState } from "react";

import HeaderBanner from "./HeaderBanner";
import NavBarConsole from "./NavBar/NavBarConsole";
import SearchBar from "./SearchBar/SearchBar";
import MobileHeader from "./Mobile/MobileHeader";

const Header = () => {
  const previousScroll = useRef(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 80) {
        setScrollDirection("up");
        previousScroll.current = currentScroll;
        return;
      }

      const difference =
        currentScroll - previousScroll.current;

      if (Math.abs(difference) < 8) return;

      setScrollDirection(
        difference > 0 ? "down" : "up"
      );

      previousScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <>
      {/* MOBILE + TABLET */}
      <div className="xl:hidden">
        <MobileHeader />
      </div>

      {/* DESKTOP */}
      <header
        className="
          hidden
          xl:block

          sticky
          top-0
          z-50
          w-full

          bg-white

          shadow-md
          shadow-black/20
        "
      >
        <HeaderBanner />

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-10xl
            flex-col
            items-center
            justify-center
            px-4
          "
        >
          <SearchBar />

          <NavBarConsole
            className={`
              transition-all
              duration-300
              ease-in-out

              ${
                scrollDirection === "down"
                  ? "-translate-y-full opacity-0 pointer-events-none"
                  : "translate-y-0 opacity-100"
              }
            `}
          />
        </div>
      </header>
    </>
  );
};

export default Header;