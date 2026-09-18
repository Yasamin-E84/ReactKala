import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import MobileCategoryMenu from "./MobileCategoryMenu";

export default function MobileBottomNav() {
  const { data } = useFetch("http://localhost:5000/mobileServices");
  const [categoryOpen, setCategoryOpen] = useState(false);
  if (!data) return null;
  return (
    <>
      <div className="flex lg:hidden fixed bottom-0 left-0 right-0 z-100 h-18 w-full items-center border-t border-[#eaeaec] bg-white">
        <div className="mx-auto flex w-[90%] items-center justify-between">
          {data.map((item) =>
            item.text === "دسته‌بندی" ? (
              <button
                key={item.text}
                onClick={() => setCategoryOpen(true)}
                className="flex h-full flex-col items-center justify-center gap-1"
              >
                <img src={item.icon} alt="" className="w-6" />
                <span className="font-Iran text-[12px] text-[#3f4064]">
                  {item.text}
                </span>
              </button>
            ) : (
              <a
                key={item.text}
                href={item.href || "#"}
                className="flex h-full flex-col items-center justify-center gap-1"
              >
                <img src={item.icon} alt="" className="w-6" />
                <span className="font-Iran text-[12px] text-[#3f4064]">
                  {item.text}
                </span>
              </a>
            ),
          )}
        </div>
      </div>
      <MobileCategoryMenu open={categoryOpen} setOpen={setCategoryOpen} />{" "}
    </>
  );
}
