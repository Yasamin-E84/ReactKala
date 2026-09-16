import useFetch from "../Hooks/useFetch";
import GroupingCard from "./WeirdGroupingcard";

export default function Grouping() {
  const { data: groups, error } = useFetch(
    "http://localhost:5000/grouping"
  );

  if (error || !groups?.length) return null;

  // Split into rows of 9 like Digikala
  const rows = [];

  for (let i = 0; i < groups.length; i += 9) {
    rows.push(groups.slice(i, i + 9));
  }

  return (
    <section
      dir="rtl"
      className="mx-auto mt-6 w-full max-w-325 px-4"
    >
      <h2 className="mb-8 text-right text-xl font-bold text-[#23254e]">
        دسته‌بندی‌ها
      </h2>

      {/* DESKTOP */}
      <div className="hidden w-full flex-col gap-8 lg:flex">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full flex-row items-center justify-between gap-10"
          >
            {row.map((item) => (
              <GroupingCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>


      {/* MOBILE */}
      <div
        className="
          flex
          gap-5
          overflow-x-auto
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
          lg:hidden
        "
      >
        {groups.map((item) => (
          <div
            key={item.id}
            className="w-20 shrink-0"
          >
            <GroupingCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}