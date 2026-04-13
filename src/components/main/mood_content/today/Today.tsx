import TodayNotAddedLog from "@/components/main/mood_content/today/TodayNotAddedLog.tsx";
import TodayAddedLog from "@/components/main/mood_content/today/TodayAddedLog.tsx";
import { useAppSelector } from "@/store/store";
import { APP_STATE } from "@/store/constants";

function Today() {
  const appState = useAppSelector((state) => state.auth.appState);

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
