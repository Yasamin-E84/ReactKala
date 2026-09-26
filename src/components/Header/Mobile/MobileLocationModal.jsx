import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { SearchIcon } from "./MobileIcons";

const TEHRAN = { lat: 35.6892, lng: 51.389 };

function MapEvents({ onChange }) {
  const map = useMap();
  useMapEvents({
    moveend() {
      const center = map.getCenter();
      onChange({ lat: center.lat, lng: center.lng });
    },
  });
  return null;
}

function MapController({ target }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 60);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (target?.lat == null || target?.lng == null) return;
    map.flyTo([target.lat, target.lng], 15, { duration: 0.7 });
  }, [map, target]);

  return null;
}

export default function MobileLocationModal({ isOpen, onClose, onConfirm }) {
  const [location, setLocation] = useState(TEHRAN);
  const [flyTarget, setFlyTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [rendered, setRendered] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef();

  useEffect(() => {
    clearTimeout(closeTimer.current);
    let frame;
    let showFrame;
    if (isOpen) {
      frame = requestAnimationFrame(() => {
        setRendered(true);
        showFrame = requestAnimationFrame(() => setVisible(true));
      });
    } else {
      frame = requestAnimationFrame(() => setVisible(false));
      closeTimer.current = setTimeout(() => setRendered(false), 250);
    }
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(showFrame);
      clearTimeout(closeTimer.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!rendered) return undefined;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [rendered, onClose]);

  if (!rendered) return null;

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
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
      const result = await response.json();
      if (!result.length) return;
      const next = { lat: Number(result[0].lat), lng: Number(result[0].lon) };
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
    navigator.geolocation.getCurrentPosition((position) => {
      const next = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setLocation(next);
      setFlyTarget(next);
    });
  };

  return createPortal(
    <div className={`fixed inset-0 z-[65000] flex h-[100dvh] w-screen flex-col overflow-hidden bg-white transition-opacity duration-250 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`} dir="rtl" role="dialog" aria-modal="true" aria-label="انتخاب موقعیت مکانی">
      <div className="shrink-0 bg-white px-4 pt-4">
        <div className="flex min-h-[62px] items-start justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-[#23254e]">انتخاب موقعیت مکانی</h2>
            <p className="mt-2 text-[11px] text-[#a1a3a8]">
              برای تحویل به‌موقع سفارش، موقعیت را دقیق انتخاب کنید.
            </p>
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-[#424750] active:bg-[#f0f0f1]" aria-label="بستن">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <label className="mb-2 flex h-[50px] items-center rounded-[9px] bg-[#f0f0f1] px-3 focus-within:ring-1 focus-within:ring-[#19bfd3]">
          <SearchIcon className="h-[21px] w-[21px] shrink-0 text-[#a1a3a8]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && searchLocation()}
            placeholder="جستجوی استان و شهر..."
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-[12px] outline-none placeholder:text-[#81858b]"
          />
          {searching && <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#d7d7d7] border-t-[#424750]" />}
        </label>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <MapContainer center={[TEHRAN.lat, TEHRAN.lng]} zoom={13} zoomControl={false} attributionControl className="absolute inset-0 h-full w-full" style={{ height: "100%", width: "100%" }}>
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapController target={flyTarget} />
          <MapEvents onChange={setLocation} />
        </MapContainer>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1000] flex -translate-x-1/2 -translate-y-full flex-col items-center">
          <span className="whitespace-nowrap rounded-[12px] bg-[#1684e8] px-3 py-[7px] text-[10px] font-bold text-white shadow">موقعیت تحویل سفارش</span>
          <span className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-[#1684e8]" />
          <span className="mt-[1px] h-[9px] w-[9px] rounded-full border-2 border-white bg-[#1684e8] shadow" />
        </div>

        <button type="button" onClick={useMyLocation} className="absolute bottom-4 right-4 z-[1100] flex h-[40px] items-center gap-2 rounded-full bg-white px-4 text-[11px] font-medium text-[#424750] shadow-[0_2px_8px_rgba(0,0,0,0.18)] active:scale-95">
          موقعیت من <span className="text-lg">◎</span>
        </button>
      </div>

      <div className="shrink-0 bg-white px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3">
        <button type="button" onClick={() => onConfirm(location)} className="flex h-[49px] w-full items-center justify-center rounded-[8px] bg-[#ef4056] text-[14px] font-bold text-white active:bg-[#d92f47]">
          ثبت موقعیت مکانی
        </button>
      </div>
    </div>,
    document.body,
  );
}
