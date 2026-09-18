import { useState, useEffect } from "react";

export default function SuggestionCard({ product }) {
  const [timeLeft, setTimeLeft] = useState(product.timerSeconds || null);

  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const toFaDigits = (num) => new Intl.NumberFormat("fa-IR").format(num);

  const formatTimer = (totalSec) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    const padFa = (num) =>
      new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 }).format(num);

    return `${padFa(hours)} : ${padFa(minutes)} : ${padFa(seconds)}`;
  };

  return (
    <div className="group relative flex flex-col border-b border-l border-[#f0f0f1] bg-white p-3 sm:p-4 transition-all hover:z-10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      {/* Top Banner Badge */}
      <div className="flex h-6 items-center justify-start">
        {product.topBadge && (
          <span className="text-xs font-bold text-[#ef4056]">
            {product.topBadge}
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative my-2 flex h-48 w-full items-center justify-center overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Title */}
      <p className="line-clamp-2 h-11 text-right text-[13px] font-medium leading-5 text-[#3f4064]">
        {product.title}
      </p>

      {/* Stock warning or rating row */}
      <div className="mt-2 flex h-5 items-center justify-between text-xs">
        {product.stockBadge ? (
          <span className="text-[11px] font-medium text-[#d32f2f]">
            {product.stockBadge}
          </span>
        ) : (
          <span />
        )}

        {product.rating && (
          <div className="flex items-center gap-1 font-medium text-[#3f4064]">
            <span>{toFaDigits(product.rating)}</span>
            <span className="text-[#f9bc00]">★</span>
          </div>
        )}
      </div>

      {/* Pricing Row */}
      <div className="mt-3 flex items-center justify-between">
        {product.discount > 0 ? (
          <span className="rounded-full bg-[#ef4056] px-2 py-0.5 text-xs font-bold text-white">
            {toFaDigits(product.discount)}٪
          </span>
        ) : (
          <span />
        )}

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 font-bold text-[#23254e]">
            <span className="text-sm sm:text-base">
              {toFaDigits(product.price)}
            </span>
            <span className="text-[10px] text-gray-500 font-normal">تومان</span>
          </div>
          {product.oldPrice && (
            <span className="text-xs text-[#c0c2c5] line-through">
              {toFaDigits(product.oldPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Live 2-Digit Countdown Timer */}
      {timeLeft > 0 ? (
        <div
          dir="ltr"
          className="mt-3 border-t border-[#f0f0f1] pt-2 text-center text-xs font-semibold tracking-wider text-[#ef4056]"
        >
          {formatTimer(timeLeft)}
        </div>
      ) : (
        <div className="h-7" />
      )}
    </div>
  );
}