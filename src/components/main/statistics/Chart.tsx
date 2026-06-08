import ChartColumn from "./ChartColumn";
import DayDetailModal from "./DayDetailModal";
import { ReactSVG } from "react-svg";
import sleepIcon from "../../../assets/icon-sleep.svg";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/store";

function Chart() {
  const logs = useAppSelector((state) => state.logs.logsData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  const showLog = () => {
    if (!logs) return;
    const sorted = [...logs].sort((a, b) => {
      const da = new Date(a.created_at_year, a.created_at_month - 1, a.created_at_day).getTime();
      const db = new Date(b.created_at_year, b.created_at_month - 1, b.created_at_day).getTime();
      return da - db;
    });
    const shownLogs = sorted.length >= 31 ? sorted.slice(-31) : sorted;
    const offset = sorted.length >= 31 ? sorted.length - 31 : 0;
    return shownLogs.map((log, i) => (
      <ChartColumn
        key={log.created_at}
        createdAtMonth={log.created_at_month}
        createdAtDay={log.created_at_day}
        mood={log.mood.mood_scale}
        sleepTime={log.sleep.sleep_time_scale}
        onSelect={() => setSelectedIndex(offset + i)}
      />
    ));
  };

  return (
    <div className="relative flex w-full">
      <div className="flex w-full h-90 pb-2.5">
        <div className="flex flex-col gap-[calc(100%/6)] justify-start h-[263px] text-3 min-w-17 text-end mr-2 pb-8 px-1">
          <div className="flex gap-1">
            <ReactSVG src={sleepIcon} className="h-2.5 w-2.5" />
            <p className="text-xs leading-[1.1] text-neutral-2">9+ hours</p>
          </div>
          <div className="flex gap-1.5">
            <ReactSVG src={sleepIcon} className="h-2.5 w-2.5" />
            <p className="text-xs leading-[1.1] text-neutral-2">7-8 hours</p>
          </div>
          <div className="flex gap-1.5">
            <ReactSVG src={sleepIcon} className="h-2.5 w-2.5" />
            <p className="text-xs leading-[1.1] text-neutral-2">5-6 hours</p>
          </div>
          <div className="flex gap-1.5">
            <ReactSVG src={sleepIcon} className="h-2.5 w-2.5" />
            <p className="text-xs leading-[1.1] text-neutral-2">3-4 hours</p>
          </div>
          <div className="flex gap-1.5">
            <ReactSVG src={sleepIcon} className="h-2.5 w-2.5" />
            <p className="text-xs leading-[1.1] text-neutral-2">0-2 hours</p>
          </div>
        </div>
        <div
          className="flex h-78 flex-1 min-w-0 pb-1 overflow-x-auto overflow-y-hidden"
          ref={scrollRef}
        >
          <div className="flex gap-3 items-end h-full px-2.5">{showLog()}</div>
        </div>
      </div>

      {selectedIndex !== null && logs && (
        <DayDetailModal
          logs={logs}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setSelectedIndex((i) => (i !== null && i < logs.length - 1 ? i + 1 : i))}
        />
      )}
    </div>
  );
}

export default Chart;
