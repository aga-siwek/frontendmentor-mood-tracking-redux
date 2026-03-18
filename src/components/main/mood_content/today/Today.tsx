import TodayNotAddedLog from "@/components/main/mood_content/today/TodayNotAddedLog.tsx";
import TodayAddedLog from "@/components/main/mood_content/today/TodayAddedLog.tsx";
import type { RootState, AppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { APP_STATE } from "@/store/appSlice.ts";

function Today() {
  const appState = useSelector((state) => state.app.appState);
  console.log(appState, "appstate today");

  const showTodayContent = () => {
    if (appState === APP_STATE.TODAY_LOG_ADDED) {
      return <TodayAddedLog />;
    } else if (appState === APP_STATE.TODAY_LOG_NOT_ADDED) {
      return <TodayNotAddedLog />;
    } else {
      return null;
    }
  };
  return (
    <div className="flex flex-col items-center ">{showTodayContent()}</div>
  );
}

export default Today;
