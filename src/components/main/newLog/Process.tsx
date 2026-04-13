import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function Process() {
  const processLevel = useSelector(
    (state: RootState) => state.newLog.process,
  );
  return (
    <div className="flex gap-4 w-full max-w-150">
      <div
        className={`h-1.5 w-full rounded-full ${
          processLevel >= 1 ? `bg-accent-2 ` : `bg-accent-3`
        }`}
      ></div>
      <div
        className={`h-1.5 w-full rounded-full ${
          processLevel >= 2 ? `bg-accent-2 ` : `bg-accent-3`
        }`}
      ></div>
      <div
        className={`h-1.5 w-full rounded-full ${
          processLevel >= 3 ? `bg-accent-2 ` : `bg-accent-3`
        }`}
      ></div>
      <div
        className={`h-1.5 w-full rounded-full ${
          processLevel >= 4 ? `bg-accent-2 ` : `bg-accent-3`
        }`}
      ></div>
    </div>
  );
}

export default Process;
