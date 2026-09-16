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

      const difference = currentScroll - previousScroll.current;

      if (Math.abs(difference) < 20) return;

      setScrollDirection(difference > 0 ? "down" : "up");

      previousScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="xl:hidden">
        <MobileHeader />
      </div>

      <header className="hidden xl:block sticky top-0 z-50 w-full">
        <HeaderBanner />

        <div className="relative h-19 w-full shadow-md shadow-black/30">
          <SearchBar />

          <NavBarConsole
            className={`
              transition-all duration-300 ease-in-out
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