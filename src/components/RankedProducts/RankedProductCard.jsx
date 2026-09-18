export default function RankedProductCard({ product, desktop = false }) {
  return (
    <div
      className={`${desktop ? "h-30 border-0 border-b border-[#f0f0f1]" : "h-20 rounded-xl border border-[#e0e0e2]"} flex w-full items-center gap-2 p-3`}
    >
      <img
        src={product.img}
        alt={product.title}
        className={`${desktop ? "size-24" : "size-20"} shrink-0 rounded-md bg-[#f8f8f8] object-contain mix-blend-multiply`}
      />

      <span
        className="bg-[#ef4056] text-white flex text-sm shrink-0 items-center justify-center rounded-full w-5 h-5 font-bold"
      >
        {product.id}
      </span>

      <p className="line-clamp-2 flex-1 text-right text-[13px] leading-6 text-[#3f4064]">
        {product.title}
      </p>
    </div>
  );
}
