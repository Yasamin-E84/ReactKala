// src/components/BottomTabBar/BottomTabBar.jsx
import { useEffect, useState } from "react";
import { getDB } from "../../api.js";
import CategoriesModal from "./CategoriesModal";

export default function BottomTabBar() {
  const [menu, setMenu] = useState([]);
  const [megaMenu, setMegaMenu] = useState([]);
  const [activeTab, setActiveTab] = useState("خانه");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    getDB().then((res) => {
      if (res?.menu) setMenu(res.menu);
      if (res?.megaMenu) setMegaMenu(res.megaMenu);
    });
  }, []);

  const handleTabClick = (item) => {
    const isCategory = item.text.includes("دسته") || item.type === "category";

    if (isCategory) {
      setIsCategoryOpen(true);
      setActiveTab(item.text);
    } else {
      setIsCategoryOpen(false);
      setActiveTab(item.text);
    }
  };

  return (
    <>
      <div
        dir="rtl"
        className="w-full h-18 flex justify-between items-center bg-white border-t border-[#eaeaec] fixed bottom-0 left-0 right-0 z-[100] desktop:hidden"
      >
        <div className="w-[90%] mx-auto flex justify-between items-center tab-menu h-full">
          {menu.map((item) => {
            const isCategory = item.text.includes("دسته") || item.type === "category";
            const isActive =
              (isCategory && isCategoryOpen) ||
              (!isCategoryOpen && activeTab === item.text);

            return (
              <div
                key={item.text}
                className="tab-menu-item flex h-full flex-col items-center justify-center gap-1 flex-1"
              >
                <button
                  type="button"
                  onClick={() => handleTabClick(item)}
                  className="flex h-full w-full flex-col items-center justify-center gap-1"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className={`w-6 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  />
                  <span
                    className={`font-Iran text-[12px] ${
                      isActive ? "text-[#0c0c0c] font-bold" : "text-[#3f4064]"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <CategoriesModal
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        megaMenu={megaMenu}
      />
    </>
  );
}