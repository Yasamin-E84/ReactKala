import { useState } from "react";
import useFetch from "../../Hooks/useFetch";

export default function MobileCategoryMenu({ open, setOpen }) {
  const { data } = useFetch("http://localhost:5000/mobileCategory");
  const [active, setActive] = useState(null);
  const [opened, setOpened] = useState(null);
  if (!open || !data) return null;
  const category = active || data[0];
  return (
    <div
      className="mobile:flex desktop:hidden fixed inset-0 z-[200] flex-row-reverse bg-white"
      dir="rtl"
    >
      <div className="w-24 border-l bg-[#f7f7f7] overflow-y-auto">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item);
              setOpened(null);
            }}
            className={`flex h-20 w-full items-center justify-center border-b text-xs ${category.id === item.id ? "bg-white text-[#ef4056]" : "text-[#3f4064]"}`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <button onClick={() => setOpen(false)} className="mb-4 text-xs">
          بستن
        </button>

        <a
          href={category.topLink.url}
          className="mb-5 block text-sm font-bold text-blue-600"
        >
          ‹ {category.topLink.title}
        </a>

        {category.columns.map((column, index) => (
          <div key={index} className="mb-5">
            <h2 className="mb-3 text-sm font-bold">{column.title}</h2>

            {column.sections.map((section, i) => (
              <div key={i} className="border-b py-3">
                <button
                  onClick={() => setOpened(opened === i ? null : i)}
                  className="flex w-full justify-between text-sm font-bold"
                >
                  {section.title}
                  <span>{opened === i ? "⌃" : "⌄"}</span>
                </button>

                {opened === i && (
                  <div className="mt-3 flex flex-col gap-3">
                    {section.items.map((item, j) => (
                      <a
                        key={j}
                        href={item.url}
                        className="text-xs text-[#555]"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
