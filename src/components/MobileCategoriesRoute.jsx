import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function MobileCategoriesRoute() {
  const [isLargeScreen, setIsLargeScreen] = useState(() =>
    window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateViewport = () => setIsLargeScreen(media.matches);

    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (isLargeScreen) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [isLargeScreen]);

  // The category view is a mobile-only overlay managed by MobileHeader.
  // Returning home also handles resizing while that overlay is open.
  return isLargeScreen ? <Navigate replace to="/" /> : null;
}
