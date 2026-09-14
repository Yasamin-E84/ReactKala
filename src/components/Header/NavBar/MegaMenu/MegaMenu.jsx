import { useState } from "react";
import db from "../../../../../db.json";

import MegaMenuIcon from "./MegaMenuIcon.jsx";
import MegaMenuColumn from "./MegaMenuColumm.jsx";

const MegaMenu = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  const megaMenu = db.megaMenu;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
    annoying
    h-[65vh]

    absolute
    top-full
    right-0

    overflow-x-visible
    z-[230]

    origin-top-right

    transition-all
    duration-200
    ease-out

    ${
      isOpen
        ? `
          block
          pointer-events-auto
          translate-y-0
          scale-100
        `
        : `
          hidden
          pointer-events-none
          -translate-y-2
          scale-[0.98]
        `
    }
  `}
    >
      <div className="direction direction-ltr h-full overflow-y-scroll scroll-smooth overflow-x-visible">
        <div className="annoying-topics h-full w-50 overflow-x-visible">
          {megaMenu.map((category, index) => {
            const isActive = activeCategory === index;

            const colsCount = Math.min(category.columns?.length ?? 0, 4);

            const safeColsCount = colsCount > 0 ? colsCount : 1;

            const panelWidth = `${safeColsCount * 13.75}rem`;

            return (
              <div
                key={category.id}
                className="pain group w-auto overflow-x-visible"
                onMouseEnter={() => setActiveCategory(index)}
              >
                {/* LEFT CATEGORY ITEM */}
                <div
                  className={`
                      menu
                      group/parent
                      border-spacing-color
                      annoying-topics-title
                      direction-rtl

                      w-full
                      h-12

                      gap-2
                      p-2
                      cursor-pointer
                      flex
                      justify-start
                      items-center

                      transition-colors
                      duration-200

                      hover:bg-white

                      ${isActive ? "bg-white" : "bg-[#f0f0f1]"}
                    `}
                >
                  <MegaMenuIcon name={category.icon} />

                  <span
                    className={`
                        menu-title
                         
                        text-xs
                        ml-2
                        transition-colors
                        duration-200

                        ${isActive ? "text-[#ed1944]" : "text-[#574a6d]"}
                      `}
                  >
                    {category.title}
                  </span>

                  {/* CATEGORY CONTENT */}
                  <div
                    className={`
                        pain-subject

                        h-[65vh]
                        p-3

                        absolute
                        bg-white

                        top-0
                        right-full

                        overflow-x-hidden
                        overflow-y-auto

                        transition-all
                        duration-200
                        ease-out

                        ${
                          isActive
                            ? `
                              opacity-100
                              visible
                              translate-x-0
                              pointer-events-auto
                            `
                            : `
                              opacity-0
                              invisible
                              translate-x-2
                              pointer-events-none
                            `
                        }
                      `}
                    style={{
                      width: panelWidth,
                      minWidth: "13.75rem",
                    }}
                  >
                    {/* TOP LINK */}
                    {category.topLink && (
                      <a
                        href={category.topLink.url}
                        className="flex gap-2 w-full justify-start items-start"
                      >
                        <span className="  mt-1 w-fit text-xs text-[#008eb2]">
                          {category.topLink.title}
                        </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-[#008eb2]"
                        >
                          <path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z" />
                        </svg>
                      </a>
                    )}

                    {/* COLUMNS */}
                    <div
                      className="subjects gap-x gap-y-1 mt-3 grid"
                      style={{
                        gridTemplateColumns: `repeat(${safeColsCount}, 13.75rem)`,
                      }}
                    >
                      {category.columns?.map((column, columnIndex) => (
                        <MegaMenuColumn
                          key={`${category.id}-${columnIndex}`}
                          column={column}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
