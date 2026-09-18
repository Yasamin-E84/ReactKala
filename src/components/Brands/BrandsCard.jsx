export default function BrandsCard({ brand, mobile = false }) {
  return (
    <a
      href="#"
      title={brand.title}
      className={`${mobile ? "h-31 w-19" : "h-31 w-22"} flex shrink-0 flex-col overflow-hidden rounded-lg border border-[#e0e0e2] bg-white`}
    >
      <div
        className={`${mobile ? "bg-gray-100" : ""} flex h-19 w-full items-center justify-center`}
      >
        <img
          src={brand.img}
          alt={brand.title}
          loading="lazy"
          className={`${mobile ? "w-15.5" : "w-18.75"} h-full object-contain mix-blend-multiply`}
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-1">
        <span className="w-full truncate text-center text-[12px] leading-4 text-[#3f4064]">
          {brand.title}
        </span>
      </div>
    </a>
  );
}
