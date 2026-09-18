import { useState } from "react";

export default function MobileFooter({ data }) {
  const [activeSection, setActiveSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const sections = [
    ...(data.linkColumns?.slice(0, 3) || []),
    { id: "partners", title: data.partners?.title || "شرکای تجاری", partners: data.perks },
  ];

  return (
    <div className="w-full bg-white px-5 pb-24 pt-4 lg:hidden" dir="rtl">
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-8 items-center gap-2 rounded-full bg-[#f0f0f1] px-4 text-[11px] text-[#3f4064]"
        >
          رفتن به بالا
          <img src="/images/footer/up.svg" alt="" className="h-3 w-3" />
        </button>
      </div>

      <div className="flex h-[54px] items-center justify-between border-b border-[#f0f0f1]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f0f1] text-[#3f4064]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
              <path d="M3.5 13v-2a8.5 8.5 0 0 1 17 0v2" />
              <rect x="2.5" y="12" width="4" height="7" rx="2" />
              <rect x="17.5" y="12" width="4" height="7" rx="2" />
              <path d="M19.5 19c0 2-2.5 3-6.5 3h-2" />
            </svg>
          </span>
          <span className="truncate text-[11px] text-[#81858b]">۷ روز هفته، ۲۴ ساعته</span>
        </div>
        <a href="tel:02161930000" className="rounded-full bg-[#f0f0f1] px-4 py-2 text-[11px] text-[#3f4064]">
          تماس
        </a>
      </div>

      <div className="flex h-[54px] items-center justify-between border-b border-[#f0f0f1]">
        <div className="flex min-w-0 items-center gap-3">
          <img src={data.downloadBanner?.appIcon} alt="" className="h-9 w-9 shrink-0 rounded-lg object-contain" />
          <span className="truncate text-[11px] text-[#81858b]">تجربه خرید بهتر در</span>
        </div>
        <a
          href={data.downloadBanner?.moreStore?.href}
          className="rounded-full bg-[#f0f0f1] px-4 py-2 text-[11px] text-[#3f4064]"
        >
          دانلود
        </a>
      </div>

      <div>
        {sections.map((section) => (
          <div key={section.id} className="border-b border-[#e0e0e2]">
            <button
              type="button"
              aria-expanded={activeSection === section.id}
              onClick={() => setActiveSection((current) => current === section.id ? null : section.id)}
              className="flex h-[53px] w-full items-center justify-between text-right text-[13px] font-bold text-[#23254e]"
            >
              {section.title}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`h-4 w-4 text-[#3f4064] transition-transform ${activeSection === section.id ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="m5 9 7 7 7-7" />
              </svg>
            </button>
            {activeSection === section.id && (
              section.partners ? (
                <div className="grid grid-cols-3 gap-3 pb-4">
                  {section.partners.map((partner) => (
                    <a key={partner.id} href={partner.href} aria-label={partner.alt} className="flex h-12 items-center justify-center rounded border border-[#e0e0e2] px-2">
                      <img src={partner.img} alt={partner.alt} className="max-h-6 max-w-full object-contain" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 pb-4">
                  {section.links?.map((link) => (
                    <a key={link.id} href={link.href} className="block text-xs text-[#81858b]">
                      {link.text}
                    </a>
                  ))}
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <div className="pt-4">
        <h3 className="mb-2 text-[13px] font-medium text-[#3f4064]">{data.bragging?.title}</h3>
        <div className="relative">
          <div
            className="overflow-hidden text-[11px] leading-6 text-[#81858b] [&_p]:mb-2 [&_h4]:font-bold"
            style={{ maxHeight: isExpanded ? "none" : 60 }}
            dangerouslySetInnerHTML={{ __html: data.bragging?.bodyHtml || "" }}
          />
          {!isExpanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-white via-white/80 to-transparent" />
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#81858b]"
        >
          {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
          <span className={isExpanded ? "rotate-90" : "-rotate-90"}>‹</span>
        </button>
      </div>
    </div>
  );
}
