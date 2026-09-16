export default function Advertisments({ ads }) {
  if (!ads?.length) return null;

  return (
    <div className="mx-auto my-4 grid w-full max-w-325 grid-cols-2 gap-2 px-3 lg:grid-cols-4 lg:px-4">
      {ads.map((ad, index) => (
        <a
          key={ad.id ?? `${ad.title}-${index}`}
          href="#"
          className="block h-19 overflow-hidden rounded-lg sm:h-22 lg:h-auto lg:aspect-4/3 lg:rounded-2xl"
        >
          <img
            src={ad.img.replace("./", "/")}
            alt={ad.title}
            className="h-full w-full object-cover object-center"
          />
        </a>
      ))}
    </div>
  );
}
