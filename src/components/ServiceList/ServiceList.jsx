import useFetch from "../Hooks/useFetch";
import { useState } from "react";
import ServiceModalList from "./ServiceModalList";

export default function ServiceList() {
  const [openModal, setOpenModal] = useState(false);

  const { data, error } = useFetch("http://localhost:5000/list");

  if (error) {
    return (
      <div className="flex w-full items-center justify-center bg-red-50 text-red-600">
        List failed to load
      </div>
    );
  }

  return (
    <>
      <div
        className="mt-6 lg:mx-auto lg:max-w-325 lg:px-4 
"
      >
        <div className="mt-4 flex w-full items-start lg:justify-between justify-evenly overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden">
          {data?.map((item) => (
            <a
              href={item.url}
              key={item.id}
              className="
                flex
                w-24
                flex-col
                items-center
                justify-center
                gap-y-4
              "
            >
              <img src={item.icon} alt={item.text} className="h-13 w-13" />

              <span className="w-24 text-center text-xs">{item.text}</span>
            </a>
          ))}

          {/* MORE */}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="
              mr-4
              flex
              w-24
              flex-col
              items-center
              justify-center
              gap-y-4
              ml-4
            lg:ml-0
            "
          >
            <div
              className="
                flex
                h-13
                w-13
                items-center
                justify-center

                rounded-full
                bg-[#f0f0f1]
              "
            >
              <img src="/images/category/more.svg" alt="" className="h-8 w-8" />
            </div>

            <span className="text-center text-xs">بیشتر</span>
          </button>
        </div>
      </div>

      <ServiceModalList
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
