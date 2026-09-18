import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import RankedProductCard from "./RankedProductCard";

export default function RankedProducts({ title, products }) {
  products = products || [];
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (!products.length) return null;

  const desktopGroups = [];
  for (let i = 0; i < products.length; i += 3) {
    desktopGroups.push(products.slice(i, i + 3));
  }

  return (
    <section className="mx-auto mt-6 w-full lg:max-w-325 lg:px-4">
      <div className="rounded-xl border border-[#e0e0e2] bg-white py-5">
        <div className="mb-5 flex items-center justify-start gap-2 px-2">
          <img src="/images/hot/fire.svg" alt="" className="size-6" />
          <h2 className="text-xl font-bold text-[#23254e]">{title}</h2>
        </div>

        {/* Desktop */}
        <div className="relative hidden lg:block">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateNavigation(swiper);
            }}
            onSlideChange={updateNavigation}
            slidesPerView="4.12"
            spaceBetween={20}
            speed={600}
            grabCursor
            slidesOffsetBefore={10}
            slidesOffsetAfter={10}
          >
            {desktopGroups.map((group, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col">
                  {group.map((product) => (
                    <RankedProductCard
                      key={product.id}
                      product={product}
                      desktop
                    />
                  ))}
                </div>
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

        {/* Mobile */}
        <div className="lg:hidden">
          <Swiper
            slidesPerView={1.5}
            spaceBetween={10}
            speed={500}
            grabCursor
            slidesOffsetBefore={10}
            slidesOffsetAfter={10}
          >
            {desktopGroups.map((group, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-2">
                  {group.map((product) => (
                    <div
                      key={product.id}
                      className={`${index === 0 ? "mr-2" : ""} ${index === product.length - 1 ? "ml-4" : ""}`}
                    >
                      <RankedProductCard product={product} />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
