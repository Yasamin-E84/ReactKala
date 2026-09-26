import { useEffect, useRef, useState } from "react";

export default function FixedHelp() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    let hideTimer;

    const handleScroll = () => {
      if (hasTriggeredRef.current || window.scrollY <= 40) return;

      hasTriggeredRef.current = true;
      // Immediately collapse button into a circle
      setIsExpanded(false);
      // Trigger the 4-second bouncing tooltip
      setShowTooltip(true);

      hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 4000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed lg:bottom-6 lg:left-6 bottom-18 left-6 z-[60] select-none">
      {/* 4-second bouncing tooltip speech bubble */}
      <div
        dir="rtl"
        className={`pointer-events-none delay-300 absolute bottom-full left-0 mb-3 origin-bottom-left transition-all duration-300 ${
          showTooltip
            ? "animate-bounce opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
      >
        <div className="relative whitespace-nowrap rounded-md bg-[#3c3b57] px-3 py-2 text-xs font-bold text-white shadow-xl">
          <span className="font-Iran">پشتیبانی دیجی‌کالا اینجاست.</span>

          {/* Tail aligned with the circular button center */}
          <div className="absolute -bottom-1.5 left-7 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#3c3b57]" />
        </div>
      </div>

      {/* Floating help button */}
      <a
        href="#"
        dir="rtl"
        aria-label="پشتیبانی"
        className={`flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#3a7afb] to-[#7659f1] text-white shadow-lg transition-all duration-500 ease-in-out active:scale-95  ${
          isExpanded ? "w-36 gap-2.5 px-4" : "w-14 px-0"
        }`}
      >
        <span
          className={`font-Iran select-none text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${
            isExpanded
              ? "max-w-[80px] opacity-100"
              : "pointer-events-none max-w-0 opacity-0 overflow-hidden"
          }`}
        >
          پشتیبانی
        </span>

        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
        >
          <path d="M812.122 459.942v-28.881c0-74.719-29.683-146.378-82.517-199.212s-124.493-82.516-199.211-82.516c-74.718 0-146.376 29.681-199.21 82.516s-82.517 124.493-82.517 199.212v29.35c2.874-0.448 5.773-0.759 8.69-0.93 14.087-0.815 28.169 1.707 41.096 7.364 13.129 5.559 24.762 14.135 33.955 25.033s15.686 23.808 18.952 37.687l38.784 162.133c3.341 13.79 3.411 28.173 0.203 41.997s-9.603 26.705-18.677 37.619c-8.398 10.236-18.978 18.47-30.966 24.098-11.988 5.623-25.083 8.499-38.326 8.414h-3.924c-38.545-1.647-75.512-15.77-105.338-40.239s-50.896-57.967-60.041-95.45c-9.144-37.478-5.867-76.915 9.339-112.371 9.814-22.886 24.253-43.315 42.254-60.087v-64.619c0-91.693 36.425-179.63 101.262-244.466s152.77-101.262 244.465-101.262c91.691 0 179.631 36.425 244.467 101.262s101.261 152.774 101.261 244.466v63.889c18.675 17.314 33.532 38.537 43.409 62.345 15.049 36.267 17.69 76.493 7.509 114.411-8.358 31.996-25.557 60.992-49.63 83.669-24.068 22.673-54.037 38.11-86.477 44.544-7.091 1.417-14.259 2.406-21.466 2.97-60.241 102.716-125.696 114.607-194.603 114.607-10.227 0-20.544-0.252-30.942-0.508l-4.578-0.111c-9.361-0.235-19.58-0.491-29.845-0.491-8.491 0-16.627-3.371-22.626-9.374-6.003-5.999-9.374-14.14-9.374-22.626s3.371-16.627 9.374-22.63c5.999-5.999 14.135-9.37 22.626-9.37 12.288 0 24.149 0.299 35.627 0.597 71.023 1.899 113.724 2.953 159.765-67.183-5.7-4.301-10.88-9.284-15.42-14.852-9.062-10.914-15.445-23.804-18.637-37.628s-3.106-28.203 0.247-41.988l38.699-162.133c3.277-13.897 9.783-26.825 18.991-37.734 9.203-10.914 20.855-19.503 34.001-25.071 12.937-5.641 27.021-8.149 41.105-7.322 2.765 0.162 5.517 0.452 8.243 0.87zM758.903 739.989l0.363-0.004 0.521-0.013c6.234-0.269 12.442-1.011 18.56-2.219 20.544-4.233 39.509-14.080 54.788-28.454s26.266-32.704 31.74-52.954c6.601-24.427 4.954-50.351-4.681-73.749-9.634-23.394-26.722-42.961-48.61-55.659-3.904-2.364-8.363-3.661-12.928-3.755-3.669 0.047-7.292 0.819-10.667 2.261-3.955 1.668-7.458 4.245-10.231 7.522s-4.736 7.159-5.726 11.337l-38.699 162.133c-1.011 4.169-1.033 8.512-0.073 12.689 0.964 4.177 2.889 8.073 5.619 11.375 2.509 3.098 5.705 5.568 9.331 7.211 1.058 0.478 2.142 0.883 3.251 1.216 0.7 0.017 1.399 0.055 2.099 0.119 1.809 0.162 3.597 0.482 5.342 0.943zM249.385 526.793c-21.888 12.698-38.974 32.26-48.609 55.659s-11.281 49.318-4.681 73.749c5.471 20.237 16.453 38.562 31.723 52.928s34.228 24.209 54.763 28.437c6.133 1.233 12.353 1.988 18.603 2.261 3.969 0.068 7.904-0.742 11.521-2.381s6.822-4.062 9.385-7.091c2.736-3.294 4.666-7.181 5.637-11.349 0.97-4.173 0.954-8.508-0.047-12.672l-38.784-162.133c-0.975-4.169-2.921-8.043-5.679-11.311-2.758-3.273-6.252-5.841-10.193-7.505-3.774-1.638-7.88-2.364-11.987-2.121s-8.099 1.455-11.651 3.529z" />
        </svg>
      </a>
    </div>
  );
}