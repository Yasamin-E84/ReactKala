import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

const TEHRAN = {
  lat: 35.6892,
  lng: 51.389,
};

function MapEvents({ onChange }) {
  const map = useMap();

  useMapEvents({
    moveend() {
      const center = map.getCenter();

      onChange({
        lat: center.lat,
        lng: center.lng,
      });
    },
  });

  return null;
}

function FlyController({ target }) {
  const map = useMap();

  const lat = target?.lat;
  const lng = target?.lng;

  useEffect(() => {
    if (lat == null || lng == null) return;

    map.flyTo([lat, lng], 15, {
      duration: 0.7,
    });
  }, [lat, lng, map]);

  return null;
}

/*
  Important for Leaflet inside a modal.

  When the modal first appears, Leaflet sometimes calculates
  its dimensions before the browser has finished sizing it.
*/
function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 50);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

export default function MobileLocationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const [location, setLocation] =
    useState(TEHRAN);

  const [flyTarget, setFlyTarget] =
    useState(null);

  const [search, setSearch] = useState("");
  const [searching, setSearching] =
    useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        oldOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const searchLocation = async () => {
    const value = search.trim();

    if (!value) return;

    try {
      setSearching(true);

      const params = new URLSearchParams({
        q: `${value}, Iran`,
        format: "jsonv2",
        limit: "1",
        countrycodes: "ir",
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`
      );

      const result = await response.json();

      if (!result.length) return;

      const next = {
        lat: Number(result[0].lat),
        lng: Number(result[0].lon),
      };

      setLocation(next);
      setFlyTarget(next);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setLocation(next);
        setFlyTarget(next);
      }
    );
  };

  return createPortal(
    <div
      dir="rtl"
      className="
        fixed
        inset-0
        z-[60000]
        flex
        h-[100dvh]
        w-screen
        flex-col
        overflow-hidden
        bg-white
      "
    >
      {/* TOP */}
      <div className="shrink-0 bg-white px-4 pt-4">
        <div className="flex min-h-[62px] items-start justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#23254e]">
              انتخاب موقعیت مکانی
            </h2>

            <p className="mt-2 text-[11px] text-[#a1a3a8]">
              برای تحویل به‌موقع سفارش، موقعیت را دقیق انتخاب کنید.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              text-[#424750]
            "
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* SEARCH */}
        <div
          className="
            mb-2
            flex
            h-[52px]
            items-center
            rounded-[9px]
            bg-[#f0f0f1]
            px-3
          "
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-[#a1a3a8]"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchLocation();
              }
            }}
            placeholder="جستجوی استان و شهر ..."
            className="
              h-full
              min-w-0
              flex-1
              bg-transparent
              px-3
              text-[12px]
              outline-none
              placeholder:text-[#81858b]
            "
          />

          {searching && (
            <div
              className="
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-[#d7d7d7]
                border-t-[#424750]
              "
            />
          )}
        </div>
      </div>

      {/* MAP MUST BE INSIDE THIS FLEX AREA */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <MapContainer
          center={[TEHRAN.lat, TEHRAN.lng]}
          zoom={13}
          zoomControl={false}
          attributionControl={true}
          className="absolute inset-0 h-full w-full"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapResizeFix />

          <MapEvents
            onChange={(next) => {
              setLocation(next);
            }}
          />

          <FlyController
            target={flyTarget}
          />
        </MapContainer>

        {/* CENTER PIN */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-[1000]
            flex
            -translate-x-1/2
            -translate-y-full
            flex-col
            items-center
          "
        >
          <div
            className="
              whitespace-nowrap
              rounded-[12px]
              bg-[#1684e8]
              px-3
              py-[7px]
              text-[10px]
              font-bold
              text-white
              shadow
            "
          >
            موقعیت تحویل سفارش
          </div>

          <div
            className="
              h-0
              w-0
              border-x-[5px]
              border-t-[6px]
              border-x-transparent
              border-t-[#1684e8]
            "
          />

          <div
            className="
              mt-[1px]
              h-[9px]
              w-[9px]
              rounded-full
              border-2
              border-white
              bg-[#1684e8]
              shadow
            "
          />
        </div>

        {/* CURRENT LOCATION */}
        <button
          type="button"
          onClick={useMyLocation}
          className="
            absolute
            bottom-4
            right-4
            z-[1100]
            flex
            h-[40px]
            items-center
            gap-2
            rounded-full
            bg-white
            px-4
            text-[11px]
            font-medium
            text-[#424750]
            shadow-[0_2px_8px_rgba(0,0,0,0.18)]
          "
        >
          موقعیت من

          <span className="text-lg">
            ◎
          </span>
        </button>
      </div>

      {/* BOTTOM BUTTON */}
      <div
        className="
          shrink-0
          bg-white
          px-4
          pb-[max(14px,env(safe-area-inset-bottom))]
          pt-3
        "
      >
        <button
          type="button"
          onClick={() =>
            onConfirm(location)
          }
          className="
            flex
            h-[49px]
            w-full
            items-center
            justify-center
            rounded-[8px]
            bg-[#ef4056]
            text-[14px]
            font-bold
            text-white
          "
        >
          ثبت موقعیت مکانی
        </button>
      </div>
    </div>,
    document.body
  );
}