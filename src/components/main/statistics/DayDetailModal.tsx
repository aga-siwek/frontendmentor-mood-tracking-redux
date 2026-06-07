import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ReactSVG } from "react-svg";
import type { Log } from "@/store/slices/logsSlice";
import veryHappyIcon from "@/assets/icon-very-happy-color.svg";
import happyIcon from "@/assets/icon-happy-color.svg";
import neutralIcon from "@/assets/icon-neutral-color.svg";
import sadIcon from "@/assets/icon-sad-color.svg";
import verySadIcon from "@/assets/icon-very-sad-color.svg";
import sleepIcon from "@/assets/icon-sleep.svg";

interface DayDetailModalProps {
  logs: Log[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MOOD_CONFIG: Record<number, { icon: string; label: string }> = {
  [-2]: { icon: verySadIcon,  label: "Very Sad"   },
  [-1]: { icon: sadIcon,      label: "Sad"         },
  [0]:  { icon: neutralIcon,  label: "Neutral"     },
  [1]:  { icon: happyIcon,    label: "Happy"       },
  [2]:  { icon: veryHappyIcon,label: "Very Happy"  },
};

const SLEEP_LABELS: Record<number, string> = {
  0: "0–2 hours",
  1: "3–4 hours",
  2: "5–6 hours",
  3: "7–8 hours",
  4: "9+ hours",
};

function DayDetailModal({ logs, selectedIndex, onClose, onPrev, onNext }: DayDetailModalProps) {
  const log = logs[selectedIndex];
  const mood = MOOD_CONFIG[log.mood.mood_scale];

  return (
    <div
      className="flex items-center justify-center bg-neutral-1-transparent fixed top-0 left-0 w-full h-full z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-2xl w-full max-w-sm flex flex-col h-[480px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-0 flex-shrink-0">
          <button
            onClick={onPrev}
            disabled={selectedIndex === 0}
            className="p-1 text-neutral-1 disabled:opacity-25 cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="font-semibold text-[16px] leading-[1.4] tracking-[-0.3px] text-neutral-1">
            {MONTHS[log.created_at_month - 1]} {log.created_at_day}, {log.created_at_year}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={onNext}
              disabled={selectedIndex === logs.length - 1}
              className="p-1 text-neutral-1 disabled:opacity-25 cursor-pointer disabled:cursor-default"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-1 text-neutral-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center gap-2 bg-neutral-5 rounded-xl py-4 px-3">
              <p className="text-xs font-semibold text-neutral-3 uppercase tracking-wide">Mood</p>
              <ReactSVG src={mood.icon} className="w-10 h-10" />
              <p className="text-sm font-semibold text-neutral-1">{mood.label}</p>
            </div>
            <div className="flex flex-col items-center gap-2 bg-neutral-5 rounded-xl py-4 px-3">
              <p className="text-xs font-semibold text-neutral-3 uppercase tracking-wide">Sleep</p>
              <ReactSVG src={sleepIcon} className="w-10 h-10" />
              <p className="text-sm font-semibold text-neutral-1">{SLEEP_LABELS[log.sleep.sleep_time_scale]}</p>
            </div>
          </div>

          <div className="h-px bg-accent-4" />

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-neutral-3 uppercase tracking-wide">Reflection</p>
            <p className="text-[15px] leading-[1.5] tracking-[-0.3px] text-neutral-1">
              {log.description.description}
            </p>
          </div>

          <div className="h-px bg-accent-4" />

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-neutral-3 uppercase tracking-wide">Tags</p>
            <div className="flex flex-wrap gap-2">
              {log.feels.map((feel, index) => (
                <span
                  key={feel.feel_name + index}
                  className="bg-accent-4 text-neutral-1 text-sm px-3 py-1 rounded-full"
                >
                  {feel.feel_name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayDetailModal;
