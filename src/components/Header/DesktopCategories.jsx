import { useState } from "react";
import db from "../../../db.json";

import MegaMenuColumn from "./NavBar/MegaMenu/MegaMenuColumm";
import MegaMenuIcon from "./NavBar/MegaMenu/MegaMenuIcon";
import FixedHelp from "../FixedHelp/FixedHelp";

export default function DesktopCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = db.megaMenu || [];
  const activeCategory = categories[activeIndex] || categories[0];

  if (!activeCategory) return null;

  return (
    <main className="hidden min-h-screen bg-[#f5f5f5] py-6 lg:block" dir="rtl">
      <section className="mx-auto max-w-[1360px] overflow-hidden rounded-xl border border-[#e0e0e2] bg-white shadow-sm">
        <div className="border-b border-[#e0e0e2] px-6 py-5">
          <h1 className="text-lg font-bold text-[#0c0c0c]">دسته‌بندی کالاها</h1>
        </div>

        <div className="flex min-h-[620px]">
          <aside className="w-60 shrink-0 overflow-y-auto border-l border-[#e0e0e2] bg-[#f0f0f1]">
            {categories.map((category, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={category.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex min-h-12 w-full items-center gap-3 px-4 text-right text-xs transition-colors ${
                    selected
                      ? "bg-white font-bold text-[#ef4056]"
                      : "border-b border-[#e0e0e2] text-[#424750] hover:bg-white"
                  }`}
                  aria-pressed={selected}
                >
                  <MegaMenuIcon name={category.icon} />
                  <span>{category.title}</span>
                </button>
              );
            })}
          </aside>

          <div className="min-w-0 flex-1 p-7">
            {activeCategory.topLink && (
              <a
                href={activeCategory.topLink.url}
                className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#008eb2] hover:text-[#00708c]"
              >
                {activeCategory.topLink.title}
                <span aria-hidden="true">‹</span>
              </a>
            )}

            <div className="grid grid-cols-2 gap-x-7 gap-y-4 xl:grid-cols-4">
              {activeCategory.columns?.map((column, index) => (
                <MegaMenuColumn key={`${activeCategory.id}-${index}`} column={column} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <FixedHelp/>
    </main>
  );
}
