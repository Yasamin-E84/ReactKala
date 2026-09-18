import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import IncredibleHeader from "./IncredibleHeader";
import IncredibleProductCard from "./IncredibleProductCard";

export default function Incredible({ className = "", classNameDesktop = "", incredible }) {
  
  
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  
  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  
  if (!incredible?.length) return null;

  return (
    <section className="mx-auto mt-6 w-full lg:max-w-325 lg:px-4">
      {/* MOBILE + TABLET */}
      <div className={`overflow-hidden lg:hidden py-3 ${className}`}>
        <IncredibleHeader mobile />

        <div className="w-full overflow-x-auto overflow-y-hidden pb-0.5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full touch-pan-x gap-x-1">
            {incredible.map((product, index) => (
              <div
                key={product.id ?? index}
                className={`h-60 w-32.5 shrink-0 ${index === 0 ? "mr-2" : ""}`}
              >
                <IncredibleProductCard
                  product={product}
                  first={index === 0}
                  last={false}
                />
              </div>
            ))}

            <div className="ml-2 h-60 w-32.5 shrink-0 overflow-hidden rounded-l-xl">
              <ViewAllCard />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div
        className={`relative hidden h-78.5 content-center place-items-center overflow-hidden rounded-2xl ${classNameDesktop} py-0.5 lg:flex`}
      >
        <div className="w-41.25 shrink-0">
          <IncredibleHeader />
        </div>

        <div className="relative min-w-0 flex-1">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateNavigation(swiper);
            }}
            onSlideChange={updateNavigation}
            onReachBeginning={updateNavigation}
            onReachEnd={updateNavigation}
            onFromEdge={updateNavigation}
            slidesPerView="auto"
            spaceBetween={4}
            speed={500}
            grabCursor
            watchOverflow
            className="h-full w-full [&_.swiper-wrapper]:items-center"
          >
            {incredible.map((product, index) => (
              <SwiperSlide
                key={product.id ?? index}
                className="h-70! w-42! shrink-0"
              >
                <IncredibleProductCard
                  product={product}
                  first={index === 0}
                  last={false}
                />
              </SwiperSlide>
            ))}

            {/* VIEW ALL — SAME WIDTH AS PRODUCT */}
            <SwiperSlide className="h-70! w-42! shrink-0 overflow-hidden rounded-l-xl">
              <ViewAllCard />
            </SwiperSlide>

            {/* REAL FINAL GAP */}
            <SwiperSlide className="h-70! w-2! shrink-0 bg-transparent pointer-events-none" />
          </Swiper>

          {!isBeginning && (
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="محصولات قبلی"
              className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0e0e2] bg-white text-[#424750] shadow-md transition hover:bg-[#f5f5f5] active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 5L15 12L8 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {!isEnd && (
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="محصولات بعدی"
              className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0e0e2] bg-white text-[#424750] shadow-md transition hover:bg-[#f5f5f5] active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 5L9 12L16 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ViewAllCard() {
  return (
    <a
      href="#"
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white text-[#3f4064]"
    >
      <img src="/images/inc/blackleft.svg" alt="" className="size-6" />
      <span className="text-xs font-medium">مشاهده همه</span>
    </a>
  );
}
