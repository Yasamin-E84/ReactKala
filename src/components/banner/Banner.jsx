import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import useFetch from "../Hooks/useFetch";
import DigikalaLoader from "../Loader/DigikalaLoader";

export default function Banner() {
  const { data, error, loading } = useFetch("http://localhost:5000/slider");
  const swiperRef = useRef(null);

  if (error) {
    return (
      <div className="flex h-[190px] md:h-[400px] w-full items-center justify-center bg-red-50 text-red-600">
        Banner failed to load
      </div>
    );
  }

  if (loading) return <DigikalaLoader minHeight="190px" />;

  return (
    <div className="relative w-full overflow-hidden py-3 md:py-0 lg:mt-35">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop
        speed={700}
        centeredSlides
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}

        // MOBILE: center slide + pieces of slides on both sides
        // DESKTOP: normal full-width single slide
        breakpoints={{
          0: {
            slidesPerView: 1.12,
            spaceBetween: 8,
          },

          640: {
            slidesPerView: 1.08,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}

        className="
          w-full

          h-[190px]
          sm:h-[230px]
          md:h-[400px]

          md:rounded-[10px]

          max-md:[&_.swiper-pagination]:hidden

          md:[&_.swiper-pagination]:!bottom-3

          md:[&_.swiper-pagination-bullet]:!mx-[3px]
          md:[&_.swiper-pagination-bullet]:!h-2
          md:[&_.swiper-pagination-bullet]:!w-2
          md:[&_.swiper-pagination-bullet]:!bg-[#424750]
          md:[&_.swiper-pagination-bullet]:!opacity-50
          md:[&_.swiper-pagination-bullet]:transition-all
          md:[&_.swiper-pagination-bullet]:duration-300

          md:[&_.swiper-pagination-bullet-active]:!w-5
          md:[&_.swiper-pagination-bullet-active]:!rounded-full
          md:[&_.swiper-pagination-bullet-active]:!bg-[#161616]
          md:[&_.swiper-pagination-bullet-active]:!opacity-100
        "
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id} className="h-full">
            <div
              className="
                h-full
                w-full
                overflow-hidden
                rounded-[8px]
                md:rounded-none
              "
            >
              <img
                src={item.src}
                alt={item.alt || ""}
                className="
                  block
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* DESKTOP NAVIGATION ONLY */}
      <div
        className="
          absolute
          bottom-6
          right-5
          z-20
          hidden
          items-center
          gap-2
          md:flex
        "
      >
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="اسلاید قبلی"
          className="
            flex
            h-[46px]
            w-[46px]
            items-center
            justify-center
            rounded-full
            border
            border-[#e0e0e2]
            bg-white
            text-[#424750]
            shadow-sm
            transition
            hover:bg-[#f5f5f5]
            active:scale-95
            rotate-180
          "
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 5L8 12L15 19"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="اسلاید بعدی"
          className="
            flex
            h-[46px]
            w-[46px]
            items-center
            justify-center
            rounded-full
            border
            border-[#e0e0e2]
            bg-white
            text-[#424750]
            shadow-sm
            transition
            hover:bg-[#f5f5f5]
            active:scale-95
            rotate-180
          "
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
