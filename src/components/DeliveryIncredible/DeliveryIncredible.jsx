import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import DeliveryProductCard from "./DeliveryProductCard";
import LocationModal from "../Header/NavBar/maps/LocationModal";
import useAddress from "../../Context/useAddress";
import hours from "/images/inc/hours.png";

export default function DeliveryIncredible() {
  const { selectedAddress, setSelectedAddress } = useAddress();
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const enabled = Boolean(selectedAddress);

  const warningRef = useRef(null);
  const swiperRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        let url = "http://localhost:5000/deliveryOffers";

        if (selectedAddress) {
          const zone = getFakeZone(selectedAddress);
          url = `http://localhost:5000/deliveryOffers?zone=${encodeURIComponent(zone)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load delivery products");
        }

        const result = await response.json();

        setProducts(result);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedAddress]);

  const shakeWarning = () => {
    warningRef.current?.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(-3px)" },
        { transform: "translateX(3px)" },
        { transform: "translateX(0)" },
      ],
      {
        duration: 420,
        easing: "ease-out",
      },
    );
  };

  return (
    <section className="mx-auto my-6 w-full lg:max-w-325 lg:px-4">
      <div className="overflow-hidden bg-[#fff9e6] lg:rounded-2xl">
        {/* TITLE */}
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-2">
            <img src={hours} alt="" className="w-20" />
            <span className="text-lg font-bold text-black">تحویل بگیر!</span>
          </div>
        </div>

        {/* WARNING / ADDRESS */}
        <div
          ref={warningRef}
          className="mx-4 my-3 flex min-h-14 items-center justify-between rounded-lg bg-[#fff0d2] px-3"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#ff8a00] text-[10px] font-bold text-white">
              i
            </span>

            <span className="text-sm font-medium text-[#23254e]">
              {enabled
                ? "محصولات قابل ارسال به این آدرس نمایش داده می‌شوند."
                : "برای بررسی امکان ارسال، آدرس را انتخاب کنید."}
            </span>
          </div>

          {!enabled && (
            <button
              type="button"
              onClick={() => setIsLocationOpen(true)}
              className="text-sm font-medium text-[#ff7a00] cursor-pointer"
            >
              انتخاب آدرس ›
            </button>
          )}
        </div>

        {/* MOBILE + TABLET */}
        <div className="lg:hidden">
          <div className="w-full overflow-x-auto overflow-y-hidden pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full touch-pan-x gap-x-1">
              {products.map((product, index) => (
                <div
                  key={product.id ?? index}
                  className={`h-60 w-32.5 shrink-0 ${index === 0 ? "mr-2" : ""} ${index === products.length - 1 ? "ml-2" : ""}`}
                >
                  <DeliveryProductCard
                    product={product}
                    enabled={enabled}
                    first={index === 0}
                    last={index === products.length - 1}
                    onDisabledClick={shakeWarning}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="relative hidden pb-4 lg:block">
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
            className="w-full"
          >
            {products.map((product, index) => (
              <SwiperSlide
                key={product.id ?? index}
                className="h-70! w-42! shrink-0"
              >
                <DeliveryProductCard
                  product={product}
                  enabled={enabled}
                  first={index === 0}
                  last={index === products.length - 1}
                  onDisabledClick={shakeWarning}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {!isBeginning && (
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0e0e2] bg-white shadow-md rotate-180"
            >
              <span className="text-xl">›</span>
            </button>
          )}

          {!isEnd && (
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0e0e2] bg-white shadow-md rotate-180"
            >
              <span className="text-xl">‹</span>
            </button>
          )}
        </div>

        {loading && (
          <div className="px-4 pb-4 text-xs text-[#81858b]">
            در حال بررسی محصولات قابل ارسال...
          </div>
        )}
      </div>
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onConfirm={(location) => {
          setSelectedAddress(location);
          setIsLocationOpen(false);
        }}
      />
    </section>
  );
}
function getFakeZone(address) {
  const name = address?.displayName ?? "";

  if (name.includes("کرج") || name.toLowerCase().includes("karaj")) {
    return "کرج";
  }

  if (name.includes("تهران") || name.toLowerCase().includes("tehran")) {
    return "تهران";
  }

  if (address?.lat && address?.lng) {
    const karajLat = 35.8400;
    const karajLng = 50.9391;
    const tehranLat = 35.6892;
    const tehranLng = 51.3890;

    const karajDistance = Math.hypot(address.lat - karajLat, address.lng - karajLng);
    const tehranDistance = Math.hypot(address.lat - tehranLat, address.lng - tehranLng);

    return karajDistance < tehranDistance ? "کرج" : "تهران";
  }

  return "تهران";
}