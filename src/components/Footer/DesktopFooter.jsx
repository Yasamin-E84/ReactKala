import { useState } from "react";
import logo from "../../assets/images/Header/SearchBar/logo.png";

export default function DesktopFooter({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="hidden w-full border-t border-[#f0f0f1] bg-white pt-8 lg:block" dir="rtl">
      <div className="mx-auto max-w-[1676px] px-5">
        <div className="flex h-10 items-center justify-between">
          <img src={logo} alt="دیجی‌کالا" className="h-[30px] w-auto object-contain" />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-10 items-center gap-2 rounded-lg border border-[#e0e0e2] px-4 text-xs text-[#a1a3a8] hover:bg-[#fafafa]"
          >
            بازگشت به بالا
            <img src="/images/footer/up.svg" alt="" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center text-xs leading-[26px] text-[#3f4064]">
          <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
          <span className="px-5 text-[#a1a3a8]">|</span>
          <span>۰۲۱-۹۱۰۰۰۱۰۰</span>
          <span className="px-5 text-[#a1a3a8]">|</span>
          <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
        </div>

        <div className="my-8 flex items-center justify-between">
          {data.topBadges?.map((badge) => (
            <a
              key={badge.id}
              href={badge.href}
              className="flex h-[104px] grow flex-col items-center justify-between py-3 text-center"
            >
              <img src={badge.img} alt="" className="h-14 w-14 object-contain" />
              <span className="text-xs text-[#3f4064]">{badge.text}</span>
            </a>
          ))}
        </div>

        <div className="mb-8 flex w-full justify-between">
          {data.linkColumns?.slice(0, 3).map((col) => (
            <div key={col.id} className="min-w-0 grow">
              <p className="mb-2 text-base font-bold leading-[34px] text-[#3f4064]">{col.title}</p>
              {col.links?.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="mb-2 block text-sm leading-[30px] text-[#81858b] hover:text-[#3f4064]"
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}

          <div className="w-[328px] shrink-0">
            <h4 className="mb-3 text-base font-bold leading-[34px] text-[#3f4064]">همراه ما باشید!</h4>
            <div className="flex items-center justify-between">
              {data.social?.map((social) => (
                <a key={social.id} href={social.href} aria-label={social.alt}>
                  <img src={social.img} alt="" className="h-10 w-10 object-contain" />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="mb-3 text-base font-bold leading-[34px] text-[#3f4064]">
                با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
              </h4>
              <form onSubmit={(event) => event.preventDefault()} className="flex h-12 items-center gap-2">
                <input
                  type="email"
                  aria-label="ایمیل شما"
                  placeholder={data.linkColumns?.[3]?.newsletterPlaceholder || "ایمیل شما"}
                  className="h-12 min-w-0 flex-1 rounded-lg bg-[#f0f0f1] px-4 text-sm text-[#3f4064] outline-none placeholder:text-[#a1a3a8]"
                />
                <button type="submit" className="h-12 rounded-lg bg-[#e0e0e2] px-4 text-sm font-bold text-white">
                  ثبت
                </button>
              </form>
            </div>
          </div>
        </div>

        {data.downloadBanner && (
          <div className="mb-7 flex h-[76px] items-center justify-between rounded bg-[#3c4b6d] px-5 py-2 text-white">
            <div className="flex items-center gap-4">
              <img src={data.downloadBanner.appIcon} alt="" className="h-11 w-11 object-contain" />
              <span className="text-xl font-bold">{data.downloadBanner.title}</span>
            </div>
            <div className="flex items-center gap-4">
              {data.downloadBanner.stores?.map((store) => (
                <a key={store.id} href={store.href}>
                  <img src={store.img} alt={store.alt} className="h-11 w-[142px] object-contain" />
                </a>
              ))}
              {data.downloadBanner.moreStore && (
                <a
                  href={data.downloadBanner.moreStore.href}
                  aria-label="اطلاعات بیشتر درباره اپلیکیشن دیجی‌کالا"
                  className="mr-1 flex h-11 w-11 items-center justify-center rounded bg-white"
                >
                  <img src={data.downloadBanner.moreStore.img} alt="" className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start justify-between gap-8 border-t border-[#f0f0f1] py-8">
          <div className="min-w-0 grow">
            <h3 className="text-[21px] font-medium leading-[44px] text-[#62666d]">
              {data.bragging?.title}
            </h3>
            <div className="relative">
              <div
                className={`text-xs leading-[26px] text-[#81858b] [&_p]:mb-3 [&_h4]:mb-1 [&_h4]:mt-4 [&_h4]:font-bold ${isExpanded ? "" : "max-h-[72px] overflow-hidden"}`}
                dangerouslySetInnerHTML={{ __html: data.bragging?.bodyHtml || "" }}
              />
              {!isExpanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white via-white/80 to-transparent" />
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#19bfd3]"
            >
              {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
              <span className={isExpanded ? "rotate-90" : "-rotate-90"}>‹</span>
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {data.trustStrip?.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-label={item.alt}
                className="flex h-[109px] w-[109px] items-center justify-center rounded-lg border border-[#e0e0e2] p-4"
              >
                <img src={item.img} alt={item.alt} className="h-[75px] w-[75px] object-contain" />
              </a>
            ))}
          </div>
        </div>

        <p className="border-t border-[#f0f0f1] py-8 text-center text-[11px] leading-6 text-[#81858b]">
          {data.copyright}
        </p>
      </div>

      <div className="w-full bg-[#f0f0f1]">
        <div className="mx-auto grid w-full max-w-[1676px] grid-cols-9">
          {data.perks?.map((perk) => (
            <a
              key={perk.id}
              href={perk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-20 items-center justify-center border-r border-b border-[#e0e0e2] px-5"
            >
              <img src={perk.img} alt={perk.alt} className="h-5 w-auto max-w-full object-contain" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
