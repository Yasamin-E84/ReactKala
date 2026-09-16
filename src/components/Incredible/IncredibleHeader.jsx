import { useEffect, useState } from "react";
import amazingsvg from "/images/inc/Amazings.svg";
import amazingoff from "/images/inc/Amazingoff.svg";
import amazingarrow from "/images/inc/blackleft.svg";

export default function IncredibleHeader({ mobile = false }) {
  const { hours, minutes, seconds } = useMidnightCountdown();

  if (mobile) {
    return (
      <div className="flex h-15 w-full items-center justify-between bg-[#ef334f] px-4 text-white">
        <div className="flex justify-center items-center gap-4">
          {/* TITLE */}
          <div className="flex items-center gap-2">
            <img src={amazingoff} alt="" className="w-14" />
            <img src={amazingsvg} alt="" className="h-6" />
          </div>

          {/* TIMER */}
          <div className="flex items-center gap-1">
            <TimerBox value={hours} />
            <span className="font-bold">:</span>
            <TimerBox value={minutes} />
            <span className="font-bold">:</span>
            <TimerBox value={seconds} />
          </div>
        </div>

        <a href="#" className="flex items-center gap-1 text-[11px] font-medium">
          <span>همه</span>
          <span>‹</span>
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-white">
      <img src={amazingoff} alt="" />

      <img src={amazingsvg} alt="" className="w-[80%]" />

      <div className="flex items-center gap-1">
        <TimerBox value={seconds} />
        <span className="font-black">:</span>
        <TimerBox value={minutes} />
        <span className="font-black">:</span>
        <TimerBox value={hours} />
      </div>

      <a
        href="#"
        className="flex h-8.5 items-center gap-2 rounded-lg bg-white px-3 text-[11px] font-bold text-[#3f4064]"
      >
        <span>مشاهده همه</span>
        <img src={amazingarrow} alt="" className="w-4" />
      </a>
    </div>
  );
}

function TimerBox({ value }) {
  return (
    <span className="flex h-7 min-w-6.75 items-center justify-center rounded bg-white px-1 text-xs font-black text-[#23254e]">
      {value}
    </span>
  );
}

function useMidnightCountdown() {
  const [time, setTime] = useState(getTimeUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

function getTimeUntilMidnight() {
  const now = new Date();

  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0,
  );

  const difference = midnight.getTime() - now.getTime();

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    hours: toPersianNumber(String(hours).padStart(2, "0")),
    minutes: toPersianNumber(String(minutes).padStart(2, "0")),
    seconds: toPersianNumber(String(seconds).padStart(2, "0")),
  };
}

function toPersianNumber(value) {
  return value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}
