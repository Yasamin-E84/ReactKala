export default function GroupingCard({ item }) {
  return (
    <a className="flex w-full flex-col items-center lg:w-max">
      <div className="mb-1 h-25 w-25">
        <img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      <p className="h-9 text-center text-sm text-[#23254e]">
        {item.title}
      </p>
    </a>
  );
}