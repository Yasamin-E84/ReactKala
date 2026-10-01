const ColumnTitle = ({ title }) => {
  return (
    <div className="titles w-full flex flex-row gap-1 border-r-2 border-r-[#ed1944] pr-2 group/child justify-start items-center  ">
      <span className="  text-[14px] font-bold text-black group-hover/child:text-[#ed1944] transition-colors duration-200">
        {title}
      </span>

      <span aria-hidden="true" className="text-base leading-none text-black transition-colors group-hover/child:text-[#ed1944]">
        ‹
      </span>
    </div>
  );
};

const MenuLink = ({ item }) => {
  return (
    <div className="child">
      <a
        href={item.url}
        className="
           
          text-xs
          text-[#a2a2a2]
          hover:text-[#ed1944]
          transition-colors
          duration-200
        "
      >
        {item.title}
      </a>
    </div>
  );
};

const MegaMenuColumn = ({ column }) => {
  if (column.type === "grouped") {
    return (
      <div className="w-55 p-2 flex flex-col gap-2  ">
        <ColumnTitle title={column.title} />

        {column.sections?.map((section, sectionIndex) => (
          <div
            key={`${section.title}-${sectionIndex}`}
            className="flex flex-col gap-2"
          >
            <span className="  text-xs font-bold text-[#424750]">
              {section.title}
            </span>

            {section.items?.map((item, itemIndex) => (
              <MenuLink key={`${item.title}-${itemIndex}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (column.type === "simple") {
    return (
      <div className="w-55 p-2 flex flex-col gap-2  ">
        <ColumnTitle title={column.title} />

        {column.items?.map((item, index) => (
          <MenuLink key={`${item.title}-${index}`} item={item} />
        ))}
      </div>
    );
  }

  return null;
};

export default MegaMenuColumn;
