import { createContext, useContext, useEffect, useState } from "react";
import DigikalaLoader from "./DigikalaLoader";

const PageLoadContext = createContext(false);

export function PageLoadSequence({ children, delay = 1200 }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <PageLoadContext.Provider value={started}>
      <style>{`
        @keyframes page-load-section-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {children}
      {!started && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-white"
          aria-live="polite"
        >
          <DigikalaLoader minHeight="100%" />
        </div>
      )}
    </PageLoadContext.Provider>
  );
}

export function ProgressiveSection({
  order,
  ready = true,
  minHeight = "180px",
  children,
}) {
  const sequenceStarted = useContext(PageLoadContext);
  const [visible, setVisible] = useState(false);
  const canReveal = sequenceStarted && ready;

  useEffect(() => {
    if (!canReveal || visible) return undefined;

    const timer = window.setTimeout(() => setVisible(true), order * 200);
    return () => window.clearTimeout(timer);
  }, [canReveal, order, visible]);

  if (!canReveal || !visible) return <DigikalaLoader minHeight={minHeight} />;

  return (
    <div className="motion-safe:animate-[page-load-section-in_220ms_ease-out_both]">
      {children}
    </div>
  );
}
