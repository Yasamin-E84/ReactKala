import { useState } from "react";
import useFetch from "../Hooks/useFetch";
import SuggestionCard from "./SuggestionCard";

export default function Suggestion({ api }) {
  const { data: section, error } = useFetch(`http://localhost:5000/${api}`);
  const [extraProducts, setExtraProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (error || !section) return null;

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      // Create a randomized copy of the existing products with shuffled values
      const shuffled = [...section.products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map((p, idx) => {
          const discountVariation = Math.floor(Math.random() * 35);
          const priceMultiplier = +(0.85 + Math.random() * 0.3).toFixed(2);
          const newPrice =
            Math.round((p.price * priceMultiplier) / 1000) * 1000;
          const badges = [null, "فروش ویژه", "پیشنهاد شگفت‌انگیز"];
          const selectedBadge =
            badges[Math.floor(Math.random() * badges.length)];

          return {
            ...p,
            id: Number(`${p.id}${Date.now().toString().slice(-3)}${idx}`),
            price: newPrice,
            oldPrice:
              discountVariation > 0 ? Math.round(newPrice * 1.25) : null,
            discount: discountVariation,
            topBadge: selectedBadge,
            stockBadge:
              Math.random() > 0.6
                ? `تنها ${Math.floor(Math.random() * 4) + 1} عدد در انبار باقی مانده`
                : null,
            timerSeconds:
              selectedBadge === "پیشنهاد شگفت‌انگیز"
                ? Math.floor(Math.random() * 25000) + 3600
                : null,
          };
        });

      setExtraProducts((prev) => [...prev, ...shuffled]);
      setIsLoadingMore(false);
    }, 400);
  };

  const allProducts = [...section.products, ...extraProducts];

  return (
    <section
      dir="rtl"
      className="mx-auto mt-6 w-full max-w-[1336px] px-2 sm:px-4"
    >
      <div className="overflow-hidden rounded-2xl border border-[#e0e0e2] bg-white">
        {section.title && (
          <div className="flex items-center justify-between border-b border-[#f0f0f1] px-5 py-4">
            <h2 className="text-lg font-bold text-[#23254e]">
              {section.title}
            </h2>
            {section.subtitle && (
              <span className="cursor-pointer text-sm font-semibold text-[#19bfd3] hover:underline">
                {section.subtitle}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-5">
          {allProducts.map((product) => (
            <SuggestionCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center border-t border-[#f0f0f1] py-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-lg bg-[#f0f0f1] px-5 py-2 text-xs font-semibold text-[#14191b] transition-colors hover:bg-[#e4e4e6] active:scale-95 disabled:opacity-50"
          >
            {isLoadingMore ? "در حال بارگذاری..." : "مشاهده بیشتر"}
          </button>
        </div>
      </div>
    </section>
  );
}
