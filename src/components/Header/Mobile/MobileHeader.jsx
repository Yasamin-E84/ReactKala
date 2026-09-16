import HeaderBanner from "../HeaderBanner";
import MobileServices from "./MobileServices";
import MobileLocation from "./MobileLocation";

export default function MobileHeader() {
  return (
    <header
       
      className="
        sticky top-0 z-50
        w-full
        bg-white
        shadow-[0_1px_3px_rgba(0,0,0,0.12)]
      "
    >
      {/* thin blue/advertising banner */}
      <div className="h-[40px] overflow-hidden">
        <HeaderBanner />
      </div>

      {/* horizontally scrollable services */}
      <MobileServices />

      {/* search + address */}
      <div className="bg-white">
        <MobileLocation />
      </div>
    </header>
  );
}