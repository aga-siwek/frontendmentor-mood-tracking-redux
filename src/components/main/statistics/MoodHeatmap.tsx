import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

const MOOD_LEGEND = [
  { scale: -2 as const, label: "Very Sad" },
  { scale: -1 as const, label: "Sad" },
  { scale:  0 as const, label: "Neutral" },
  { scale:  1 as const, label: "Happy" },
  { scale:  2 as const, label: "Very Happy" },
];

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

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  if (!logs) return null;

  const sorted = sortByDisplayDate(logs);
  const availableYears = [...new Set(sorted.map((log) => log.created_at_year))].sort((a, b) => b - a);

  const logMap = new Map<string, Log>();
  sorted.forEach((log) => {
    logMap.set(`${log.created_at_year}-${log.created_at_month}-${log.created_at_day}`, log);
  });

  const jan1 = new Date(selectedYear, 0, 1);
  const startDayOfWeek = jan1.getDay();
  const gridStart = new Date(jan1);
  gridStart.setDate(jan1.getDate() + (startDayOfWeek === 0 ? -6 : 1 - startDayOfWeek));

  const dec31 = new Date(selectedYear, 11, 31);
  const endDayOfWeek = dec31.getDay();
  const gridEnd = new Date(dec31);
  if (endDayOfWeek !== 0) gridEnd.setDate(dec31.getDate() + (7 - endDayOfWeek));

  const today = new Date();
  const weeks: Date[][] = [];
  const currentDate = new Date(gridStart);
  while (currentDate <= gridEnd) {
    const week: Date[] = [];
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  const monthLabels: (string | null)[] = weeks.map((week, weekIndex) => {
    const monday = week[0];
    if (monday.getFullYear() !== selectedYear) return null;
    if (weekIndex === 0 || monday.getDate() <= 7) return MONTHS[monday.getMonth()];
    return null;
  });

  const handleCellClick = (date: Date) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const log = logMap.get(dateKey);
    if (!log) return;
    const idx = sorted.indexOf(log);
    if (idx !== -1) setSelectedIndex(idx);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-neutral-5 rounded-2xl py-5 px-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[28px] leading-[1.3] tracking-[-0.3px] text-neutral-1">
          Mood history
        </p>
        {availableYears.length > 1 && (
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="text-sm font-medium pl-3 pr-8 py-2 rounded-md bg-accent-4 text-neutral-1 cursor-pointer border-none outline-none appearance-none"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-2" />
          </div>
        )}
        {availableYears.length <= 1 && (
          <span className="text-sm font-medium px-3 py-2 rounded-md bg-accent-4 text-neutral-1">
            {currentYear}
          </span>
        )}
      </div>

      <div
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        <div
          className="flex flex-col gap-1 w-full"
          style={{ minWidth: `${28 + weeks.length * 11 + (weeks.length - 1) * 4}px` }}
        >
          <div
            className="grid gap-1 mb-1"
            style={{ gridTemplateColumns: `28px repeat(${weeks.length}, 1fr)` }}
          >
            <div />
            {monthLabels.map((label, i) => (
              <div key={i} className="text-[10px] text-neutral-3 leading-none overflow-visible whitespace-nowrap">
                {label ?? ""}
              </div>
            ))}
          </div>

          {DAY_LABELS.map((dayLabel, dayIndex) => (
            <div
              key={dayIndex}
              className="grid gap-1 items-center"
              style={{ gridTemplateColumns: `28px repeat(${weeks.length}, 1fr)` }}
            >
              <span className="text-[10px] text-neutral-3 text-right pr-1 leading-none">
                {dayLabel}
              </span>
              {weeks.map((week, weekIndex) => {
                const cellDate = week[dayIndex];
                const isOutsideYear = cellDate.getFullYear() !== selectedYear;
                const isFuture = cellDate > today;
                const dateKey = `${cellDate.getFullYear()}-${cellDate.getMonth() + 1}-${cellDate.getDate()}`;
                const log = logMap.get(dateKey);

                const bg = log?.mood?.mood_scale != null
                  ? MOOD_BG[log.mood.mood_scale]
                  : isFuture
                    ? "bg-accent-4/30"
                    : "bg-accent-4/60";

                return (
                  <div
                    key={weekIndex}
                    onClick={() => !isOutsideYear && !isFuture && log && handleCellClick(cellDate)}
                    className={`w-full aspect-square rounded-sm ${isOutsideYear ? "opacity-0" : bg} ${!isOutsideYear && !isFuture && log ? "cursor-pointer hover:opacity-75" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {MOOD_LEGEND.map(({ scale, label }) => (
          <div key={scale} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${MOOD_BG[scale]}`} />
            <span className="text-[11px] text-neutral-3">{label}</span>
          </div>
        ))}
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
