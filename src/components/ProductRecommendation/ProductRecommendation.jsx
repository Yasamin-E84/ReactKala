import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useFetch from "../Hooks/useFetch";
import ProductCard from "./ProductCard";
import DigikalaLoader from "../Loader/DigikalaLoader";

export default function ProductRecommendation({ api }) {
  const { data: response, error, loading } = useFetch(`http://localhost:5000/${api}`);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (loading) return <DigikalaLoader minHeight="280px" />;
  if (error || !response) return null;

  const sections = Array.isArray(response) ? response : [response];

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          className="mx-auto mt-6 w-full lg:max-w-325 lg:px-4"
        >
          <div className="rounded-xl border border-[#e0e0e2] bg-white py-4">
            <div className="mb-5 text-right px-4">
              <h2 className="text-lg font-bold text-[#23254e]">
                {section.title}
              </h2>
              <p className="text-sm text-[#81858b]">{section.subtitle}</p>
            </div>

            {/* MOBILE SCROLL */}
            <div className="lg:hidden overflow-x-auto scrollbar-none px-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max gap-2">
                {section.products?.map((product) => (
                  <div key={product.id} className="">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* DESKTOP SWIPER */}
            <div className="relative hidden lg:block">
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
                spaceBetween={8}
                slidesOffsetBefore={10}
                slidesOffsetAfter={10}
                speed={500}
                grabCursor
                watchOverflow
                className="product-swiper"
              >
                {section.products?.map((product) => (
                  <SwiperSlide key={product.id} className="!w-[190px]">
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {!isBeginning && (
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0e0e2] bg-white shadow-md"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path
                      d="M8 5L15 12L8 19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </button>
              )}

              {!isEnd && (
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0e0e2] bg-white shadow-md"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path
                      d="M16 5L9 12L16 19"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
