import Chart from "@/components/main/statistics/Chart.tsx";

function Statistics({}) {
  return (
    <div className="flex flex-col gap-8 items-center justify-start py-5 px-4 rounded-2xl w-full bg-neutral-5 z-0 lg:w-2/3">
      <p className="font-semibold text-[28px] leading-[1.3] tracking-[-0.3px] text-neutral-1">
        Mood and sleep trends
      </p>
      <Chart />
    </div>
  );
}
export default Statistics;
