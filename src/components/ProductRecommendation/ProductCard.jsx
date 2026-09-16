import toman from "/images/inc/toman.svg";

export default function ProductCard({ product }) {
  const toPersianNumber = (value) =>
    String(value).replace(/[0-9]/g, (n) => "۰۱۲۳۴۵۶۷۸۹"[n]);
  return (
    <a
      href="#"
      className="flex h-55 w-33.5 flex-col rounded-lg border border-[#e0e0e2] bg-white lg:h-70 lg:w-47.5"
    >
      <div className="flex h-26.25 w-full items-center justify-center bg-gray-100 lg:h-37.5">
        <img
          src={product.img.replace("./", "/")}
          alt={product.title}
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="w-full px-4 py-1 flex flex-col justify-between items-center h-full">
        <p className="mt-2 line-clamp-2 min-h-9.5 text-right text-[11px] leading-5 text-[#3f4064] lg:text-[14px]">
          {product.title}
        </p>

        <div className="mt-auto w-full ">
          <div className="flex justify-end items-center gap-2 ml-5">
            {product.discount && product.discount !== "0%" && (
              <span className="rounded-full bg-[#ef4056] px-2 py-0.5 text-[12px] font-bold text-white">
                {toPersianNumber(product.discount)}
              </span>
            )}
            {product.oldPrice && product.oldPrice !== "0" && (
              <div className="mb-1 text-left text-[13px] text-[#a1a3a8] line-through">
                {toPersianNumber(product.newPrice)}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-1 w-full">
            <div className="mr-auto flex items-center gap-1">
              <span className="text-xs font-bold text-[#23254e] lg:text-lg">
                {toPersianNumber(product.newPrice)}
              </span>

              <img src={toman} className="w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
