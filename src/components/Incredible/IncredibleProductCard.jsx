import toman from "/images/inc/toman.svg";

export default function IncredibleProductCard({ product, first, last }) {
  return (
    <a href="#" className={`flex h-60 w-full flex-col border-l-0.5 border-[#ef334f] bg-white px-2 pb-1.5 pt-1.5 lg:h-70 lg:pb-2 ${first ? "rounded-r-xl" : ""} ${last ? " rounded-l-xl border-l-0 " : ""}`}>
      <div className="flex h-28 w-full shrink-0 items-center justify-center lg:h-39">
        <img src={product.img.replace("./", "/")} alt={product.title} className="h-full w-full object-contain" />
      </div>

      <p className="mt-1 line-clamp-2 min-h-10 w-full text-right text-xs leading-5 text-[#3f4064] lg:text-[13px]">
        {product.title}
      </p>

      <div className="mt-auto">
        <div className="flex w-full items-center justify-between gap-1">
          <span className="flex h-5 min-w-8 shrink-0 items-center justify-center rounded-full bg-[#d32f2f] px-1.5 text-[10px] font-bold text-white">
            {product.discount}
          </span>

          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate text-xs font-bold text-[#23254e] lg:text-sm">
              {product.newPrice}
            </span>

            <img src={toman} alt="" className="w-4 shrink-0" />
          </div>
        </div>

        <div className="mt-0.5 pl-5 text-left text-[10px] text-[#c0c2c5] line-through">
          {product.oldPrice}
        </div>
      </div>
    </a>
  );
}