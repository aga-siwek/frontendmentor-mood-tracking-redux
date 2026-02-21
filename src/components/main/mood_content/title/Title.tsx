import TodayDate from "@/components/main/mood_content/title/TodayDate.tsx";

function Title() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h3 className="font-semibold text-[28px] leading-[1.4] tracking-[-0.3px] text-accent-2">
        Hello, Lisa!
      </h3>
      <h1 className="font-semibold text-[46px] leading-[1.2] tracking-[-0.2px] text-neutral-1">
        How are you feeling today?
      </h1>
      <TodayDate />
    </div>
  );
}

export default Title;
