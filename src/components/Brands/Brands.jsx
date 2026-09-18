import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useFetch from "../Hooks/useFetch";
import { useRef, useState } from "react";
import BrandsCard from "./BrandsCard";

export default function Brands() {
  const { data: brands, error } = useFetch("http://localhost:5000/brands");

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (error) return null;
  if (!brands) return null;

  return (
    <section className="mx-auto mt-6 w-full lg:max-w-325 lg:px-4">
      <div className="rounded-xl border border-[#e0e0e2] bg-white py-4">
        <div className="mb-5 flex items-center justify-start gap-2 px-2">
          <img src="/images/brands/starblack.svg" alt="" />{" "}
          <h2 className="text-lg font-bold text-[#23254e]">
            محبوب‌ترین برندها
          </h2>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                updateNavigation(swiper);
              }}
              onSlideChange={updateNavigation}
              slidesPerView="auto"
              spaceBetween={8}
              freeMode
              speed={600}
              grabCursor
              slidesOffsetBefore={10}
              slidesOffsetAfter={10}
              resistanceRatio={0.85}
              watchOverflow
            >
              {brands.map((brand, index) => (
                <SwiperSlide key={index} className="!w-[88px]">
                  <BrandsCard brand={brand} />
                </SwiperSlide>
              ))}
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

        <div className="flex w-max min-w-full touch-pan-x gap-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide lg:hidden">
          {brands.map((brand, index) => (
            <div
              key={index}
              className={`${index === 0 ? "mr-2" : ""} ${index === brands.length - 1 ? "ml-2" : ""}`}
            >
              <BrandsCard brand={brand} mobile />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
