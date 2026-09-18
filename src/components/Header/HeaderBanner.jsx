import useFetch from "../Hooks/useFetch";

const HeaderBanner = () => {
  const { data, error } = useFetch(
    "http://localhost:5000/HeaderBanner"
  );

  if (error) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          bg-red-50
          text-sm
          text-red-600
        "
      >
        Banner failed to load
      </div>
    );
  }

  return (
    <div className="h-15 w-full overflow-hidden">
      {data?.map((item) => (
        <img
          key={item.id}
          src={item.img}
          alt={item.alt}
          className="
            block
            h-full
            w-full
            object-cover
            object-center
          "
        />
      ))}
    </div>
  );
};

export default HeaderBanner;