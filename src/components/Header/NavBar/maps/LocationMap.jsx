import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

const TEHRAN = {
  lat: 35.6892,
  lng: 51.389,
};

function MapMovementListener({ onCenterChange }) {
  const map = useMap();

  useMapEvents({
    moveend() {
      const center = map.getCenter();

      onCenterChange({
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
      duration: 0.8,
    });
  }, [map, lat, lng]);

  return null;
}

export default function LocationMap({ onConfirm }) {
  const [location, setLocation] = useState(TEHRAN);
  const [search, setSearch] = useState("");
  const [flyTarget, setFlyTarget] = useState(null);
  const [searching, setSearching] = useState(false);

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
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Location search failed");
      }

      const result = await response.json();

      if (!result.length) {
        return;
      }

      const newLocation = {
        lat: Number(result[0].lat),
        lng: Number(result[0].lon),
        displayName: result[0].display_name,
      };

      setLocation(newLocation);
      setFlyTarget(newLocation);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* MAP */}
      <div
        className="
          relative
          min-h-0
          flex-1
          overflow-hidden
          bg-[#F3F4F6]
        "
      >
        <MapContainer
          center={[TEHRAN.lat, TEHRAN.lng]}
          zoom={14}
          zoomControl={false}
          attributionControl={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapMovementListener
            onCenterChange={(newLocation) => {
              setLocation((current) => ({
                ...current,
                ...newLocation,
              }));
            }}
          />

          <FlyController target={flyTarget} />
        </MapContainer>

        {/* SEARCH BAR */}
        <div
          className="
            absolute
            left-1/2 top-[10px]
            z-[1000]
            w-[calc(100%-48px)]
            max-w-[620px]
            -translate-x-1/2
          "
        >
          <div
            className="
              flex h-[57px] items-center
              overflow-hidden
              rounded-[11px]
              bg-white
              shadow-[0_2px_8px_rgba(0,0,0,0.10)]
            "
          >
            {/* Search icon */}
            <button
              type="button"
              onClick={searchLocation}
              aria-label="جستجو"
              disabled={searching}
              className="
                flex h-full w-[58px]
                shrink-0
                items-center justify-center
                text-[#9CA3AF]
                transition
                hover:bg-gray-50
                disabled:opacity-50
              "
            >
              {searching ? (
                <span
                  className="
                    h-5 w-5
                    animate-spin
                    rounded-full
                    border-2 border-gray-300
                    border-t-gray-700
                  "
                />
              ) : (
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M16.2 16.2L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchLocation();
                }
              }}
              placeholder="جستجوی استان و شهر ..."
              className="
                h-full flex-1
                bg-white
                px-2
                text-right
                text-[15px]
                font-medium
                text-[#374151]
                outline-none
                placeholder:text-[#8F949C]
              "
            />
          </div>
        </div>

        {/* EXACT FIXED CENTER MARKER */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2 top-1/2
            z-[900]
            flex
            -translate-x-1/2
            -translate-y-[88%]
            flex-col
            items-center
          "
        >
          <div
            className="
              whitespace-nowrap
              rounded-[12px]
              bg-[#1684E8]
              px-[10px] py-[6px]
              text-[11px]
              font-semibold
              leading-none
              text-white
              shadow-sm
            "
          >
            موقعیت تحویل سفارش
          </div>

          {/* little triangle */}
          <div
            className="
              h-0 w-0
              border-x-[5px]
              border-t-[6px]
              border-x-transparent
              border-t-[#1684E8]
            "
          />

          {/* target dot */}
          <div
            className="
              mt-[2px]
              h-[10px] w-[10px]
              rounded-full
              border-[3px]
              border-white
              bg-[#1684E8]
              shadow-[0_1px_4px_rgba(0,0,0,0.35)]
            "
          />
        </div>
      </div>

      {/* BUTTON AREA */}
      <div className="shrink-0 bg-white py-[38px] pb-[16px]">
        <button
          type="button"
          onClick={() => onConfirm(location)}
          className="
            flex h-[49px]
            w-full
            items-center justify-center
            rounded-[9px]
            bg-[#F43F56]
            text-[15px]
            font-bold
            text-white
            transition
            hover:bg-[#ED334D]
            active:scale-[0.995]
          "
        >
          ثبت موقعیت مکانی
        </button>
      </div>
    </div>
  );
}
