import { useState } from "react";
import { useAppSelector } from "@/store/store";
import type { Log } from "@/store/slices/logsSlice";
import DayDetailModal from "./DayDetailModal";

const MOOD_BG: Record<number, string> = {
  [-2]: "bg-detail-2",
  [-1]: "bg-detail-3",
  [0]:  "bg-detail-4",
  [1]:  "bg-detail-5",
  [2]:  "bg-detail-6",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["Mon","","Wed","","Fri","","Sun"];

const sortByDisplayDate = (logs: Log[]) =>
  [...logs].sort((logA, logB) =>
    new Date(logA.created_at_year, logA.created_at_month - 1, logA.created_at_day).getTime() -
    new Date(logB.created_at_year, logB.created_at_month - 1, logB.created_at_day).getTime()
  );

function MoodHeatmap() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const logs = useAppSelector((state) => state.logs.logsData);

  if (!logs || logs.length <= 31) return null;

  const sorted = sortByDisplayDate(logs);

  const logMap = new Map<string, Log>();
  sorted.forEach((log) => {
    logMap.set(`${log.created_at_year}-${log.created_at_month}-${log.created_at_day}`, log);
  });

  const firstLog = sorted[0];
  const startDate = new Date(firstLog.created_at_year, firstLog.created_at_month - 1, firstLog.created_at_day);
  const startDayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() + (startDayOfWeek === 0 ? -6 : 1 - startDayOfWeek));

  const today = new Date();
  const weeks: Date[][] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    const week: Date[] = [];
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  const monthLabels: (string | null)[] = weeks.map((week, weekIndex) => {
    const monday = week[0];
    if (weekIndex === 0 || monday.getDate() <= 7) return MONTHS[monday.getMonth()];
    return null;
  });

  const handleCellClick = (date: Date) => {
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const log = logMap.get(key);
    if (!log) return;
    const idx = sorted.indexOf(log);
    if (idx !== -1) setSelectedIndex(idx);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-neutral-5 rounded-2xl py-5 px-4">
      <p className="font-semibold text-[28px] leading-[1.3] tracking-[-0.3px] text-neutral-1">
        Mood history
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="flex flex-col gap-1 min-w-max">
          <div
            className="grid gap-1 mb-1"
            style={{ gridTemplateColumns: `28px repeat(${weeks.length}, 14px)` }}
          >
            <div />
            {monthLabels.map((label, i) => (
              <div key={i} className="text-[10px] text-neutral-3 leading-none">
                {label ?? ""}
              </div>
            ))}
          </div>

          {DAY_LABELS.map((dayLabel, dayIndex) => (
            <div
              key={dayIndex}
              className="grid gap-1 items-center"
              style={{ gridTemplateColumns: `28px repeat(${weeks.length}, 14px)` }}
            >
              <span className="text-[10px] text-neutral-3 text-right pr-1 leading-none">
                {dayLabel}
              </span>
              {weeks.map((week, weekIndex) => {
                const cellDate = week[dayIndex];
                const isFuture = cellDate > today;
                const dateKey = `${cellDate.getFullYear()}-${cellDate.getMonth() + 1}-${cellDate.getDate()}`;
                const log = logMap.get(dateKey);
                const bg = log?.mood?.mood_scale != null
                  ? MOOD_BG[log.mood.mood_scale]
                  : "bg-neutral-4";

                return (
                  <div
                    key={weekIndex}
                    onClick={() => log && !isFuture && handleCellClick(cellDate)}
                    className={`w-3.5 h-3.5 rounded-sm ${bg} ${isFuture ? "opacity-0" : ""} ${log && !isFuture ? "cursor-pointer hover:opacity-75" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-neutral-3">
        <span>Less</span>
        {([-2, -1, 0, 1, 2] as const).map((scale) => (
          <div key={scale} className={`w-3 h-3 rounded-sm ${MOOD_BG[scale]}`} />
        ))}
        <span>More</span>
      </div>

      {selectedIndex !== null && (
        <DayDetailModal
          logs={sorted}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((index) => (index !== null && index > 0 ? index - 1 : index))}
          onNext={() => setSelectedIndex((index) => (index !== null && index < sorted.length - 1 ? index + 1 : index))}
        />
      )}
    </div>
  );
}

export default MoodHeatmap;
