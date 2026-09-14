import useFetch from "../../Hooks/useFetch";

export default function MobileServices() {
  const { data: services, error } = useFetch(
    "http://localhost:5000/services"
  );

  if (error || !services) return null;

  return (
    <div
      dir="rtl"
      className="
        w-full
        overflow-x-auto
        overflow-y-hidden
        border-b
        border-[#f0f0f1]
        bg-white
        py-[7px]

        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <div
        className="
          flex
          w-max
          min-w-full
          items-stretch
          gap-[7px]
          px-[8px]
        "
      >
        {services.map((item) => {
          const isFirst = Number(item.id) === 1;

          return (
            <button
              key={item.id}
              type="button"
              className={`
                flex
                h-[66px]
                shrink-0
                flex-col
                items-center
                justify-center

                rounded-[8px]
                border

                transition-colors
                duration-200

                ${
                  isFirst
                    ? "w-[48px]"
                    : "w-[66px]"
                }

                ${
                  item.active
                    ? "border-[#e6123d] bg-[#e6123d]"
                    : "border-[#e0e0e2] bg-white"
                }
              `}
            >
              <img
                src={item.Simg.replace("./", "/")}
                alt={item.Stitle || ""}
                className={`
                  object-contain

                  ${
                    isFirst
                      ? "h-[27px] w-[27px]"
                      : "h-[34px] w-[34px]"
                  }
                `}
              />

              {item.Stitle && (
                <span
                  className={`
                    mt-[3px]
                    max-w-full
                    truncate
                    px-1
                    text-center
                    text-[10px]
                    font-medium
                    leading-[14px]

                    ${
                      item.active
                        ? "text-white"
                        : "text-[#3f4064]"
                    }
                  `}
                >
                  {item.Stitle}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}