export default function DigikalaLoader({
  className = "",
  minHeight = "180px",
}) {
  return (
    <div
      className={`flex w-full items-center justify-center ${className}`}
      style={{ minHeight }}
      role="status"
      aria-label="در حال بارگذاری"
    >
      <div className="flex items-center gap-[3px]" aria-hidden="true">
        <span className="size-[5px] rounded-full bg-[#a1a3a8] animate-pulse [animation-duration:900ms]" />

        <span className="size-[5px] rounded-full bg-[#a1a3a8] animate-pulse [animation-duration:900ms] [animation-delay:150ms]" />

        <span className="size-[5px] rounded-full bg-[#a1a3a8] animate-pulse [animation-duration:900ms] [animation-delay:300ms]" />
      </div>
    </div>
  );
}