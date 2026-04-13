import ChartColumn from "./ChartColumn.jsx";
import ColumnInfo from "./ColumnInfo.jsx";
import { ReactSVG } from "react-svg";
import sleepIcon from "../../../assets/icon-sleep.svg";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/store";

function Chart() {
  const logs = useAppSelector((state) => state.logs.logsData);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const scrollRef = useRef(null);
  const chartAnchorRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  useEffect(() => {
    if (!selectedColumn) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (chartAnchorRef.current && !chartAnchorRef.current.contains(e.target as Node)) {
        setSelectedColumn(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectedColumn]);

  const showLog = () => {
    if (!logs) return;
    const shownLogs = logs.length >= 11 ? logs.slice(-11) : logs;
    return shownLogs.map((log) => (
      <ChartColumn
        key={log.created_at}
        createdAtMonth={log.created_at_month}
        createdAtDay={log.created_at_day}
        mood={log.mood.mood_scale}
        feels={log.feels}
        sleepTime={log.sleep.sleep_time_scale}
        onSelect={() =>
          setSelectedColumn((prev) =>
            prev?.created_at === log.created_at ? null : log
          )
        }
      />
    ));
  };

  return (
    <div id="chart-anchor" className="relative flex w-full" ref={chartAnchorRef}>
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

      {selectedColumn && (
        <>
          {/* mobile: fixed to bottom of screen */}
          <div className="fixed left-4 right-4 bottom-4 z-300 md:hidden">
            <ColumnInfo
              description={selectedColumn.description.description}
              mood={selectedColumn.mood.mood_scale}
              feels={selectedColumn.feels}
              sleepTime={selectedColumn.sleep.sleep_time_scale}
            />
          </div>
          {/* tablet/desktop: wycentrowany w charcie */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-300 w-[219px]">
            <ColumnInfo
              description={selectedColumn.description.description}
              mood={selectedColumn.mood.mood_scale}
              feels={selectedColumn.feels}
              sleepTime={selectedColumn.sleep.sleep_time_scale}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Chart;
