import { useState } from "react";

export default function BraggingSection({ title, bodyHtml }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full text-right" dir="rtl">
      {title && (
        <h3 className="text-[17px] font-bold text-[#23254e] mb-3">
          {title}
        </h3>
      )}

      {/* Expandable text wrapper with bottom fade in collapsed state */}
      <div className="relative">
        <div
          className={`text-[12px] leading-[2.1] text-[#81858b] text-justify transition-all duration-300 [&_p]:mb-3 [&_h4]:font-bold [&_h4]:text-[#3f4064] [&_h4]:text-[13px] [&_h4]:mt-4 [&_h4]:mb-1.5 ${
            isExpanded ? "max-h-none" : "max-h-[72px] overflow-hidden"
          }`}
          dangerouslySetInnerHTML={{ __html: bodyHtml || "" }}
        />

        {/* Faded white gradient on the last line when collapsed */}
        {!isExpanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent" />
        )}
      </div>

      {/* Toggle button matching screenshot */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#19bfd3] hover:opacity-80 transition"
      >
        <span>{isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? "rotate-90" : "-rotate-90"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}