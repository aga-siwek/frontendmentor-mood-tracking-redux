import Header from "@/components/main/header/Header.tsx";
import Title from "@/components/main/mood_content/title/Title.tsx";
import MoodContent from "@/components/main/mood_content/MoodContent.tsx";
import { useAppSelector } from "@/store/store";
import Setting from "@/components/main/setting/Setting.tsx";
import NewLog from "@/components/main/newLog/NewLog.tsx";
import { APP_STATE } from "@/store/constants";

function MainContent() {
  const settingIsOpen = useAppSelector(
    (state) => state.ui.settingIsOpen,
  );
  const appState = useAppSelector((state) => state.auth.appState);
  const addNewLogIsOpen = useAppSelector(
    (state) => state.ui.addNewLogIsOpen,
  );

  const settingShown = () => {
    if (appState === APP_STATE.USER_NAME_NOT_ADDED) {
      return <Setting />;
    } else if (settingIsOpen) {
      return <Setting />;
    } else {
      return;
    }
  };

  const addNewLogShown = () => {
    if (addNewLogIsOpen) {
      return <NewLog />;
    } else {
      return;
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-12 p-3 relative">
        <Header />
        <Title />
        <MoodContent />
      </div>
      {settingShown()}
      {addNewLogShown()}
    </div>
  );
}

export default MainContent;
