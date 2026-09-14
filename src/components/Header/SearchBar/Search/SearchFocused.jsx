import useFetch from "../../../Hooks/useFetch";

const SearchFocused = ({ onClose }) => {
  const { data, error } = useFetch("http://localhost:5000/PopularSearch");
  const { data: ad, error: errorad } = useFetch(
    "http://localhost:5000/SearchAd",
  );
  if (error) {
    return (
      <div className="w-full h-15 px-4 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm flex items-center justify-center">
        PopularSearch failed to load
      </div>
    );
  }
  return (
    <div className="bg-white min-w-150 min-h-[35vh] rounded-3xl p-2 flex flex-col justify-start items-start gap-4">
      <div className="bg-[#f0f0f1] flex justify-start items-center gap-4 rounded-full min-w-150 py-2 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="#a2a4a9"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="جستجو در همه کالاها"
          className="w-full h-full rounded-full outline-none border-none placeholder:  placeholder:text-xs pb-2 placeholder:text-[#b5acb2] placeholder:font-bold"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-4">
        <p className="font-semi bold   text-[15px]">جستجوهای پرطرفدار</p>
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="w-fit py-1 px-1 flex justify-start items-center gap-2 flex-wrap">
            {data?.map((item) => (
              <div
                key={item.id}
                className="rounded-full w-fit py-1 px-3 flex justify-start items-center gap-1 border border-[#e4e4e6]"
              >
                <img src={item.img} alt="" className="w-6" />
                <p className="  text-[13px]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {errorad ? (
        <div className="w-full h-15 px-4 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm flex items-center justify-center">
          SearchAd failed to load
        </div>
      ) : (
        ad?.map((item) => (
          <div className="p-3" key={item.id}>
            <img src={item.img} alt={item.alt || ""} className="rounded-lg" />
          </div>
        ))
      )}
    </div>
  );
};

export default SearchFocused;
