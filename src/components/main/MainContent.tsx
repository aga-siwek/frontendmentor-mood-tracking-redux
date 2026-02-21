import Header from "@/components/main/header/Header.tsx";
import Title from "@/components/main/mood_content/title/Title.tsx";
import MoodContent from "@/components/main/mood_content/MoodContent.tsx";
import { useSelector } from "react-redux";
import Setting from "@/components/main/setting/Setting.tsx";
import NewLog from "@/components/main/newLog/NewLog.tsx";



function MainContent() {
    const settingIsOpen = useSelector((state) => state.app.settingIsOpen)
    const addNewLogIsOpen = useSelector((state) => state.app.addNewLogIsOpen)

    const settingShown = () => {
        if (settingIsOpen) {
            return <Setting />
        }
        else {
            return
        }
    }

    const addNewLogShown = () => {
        if (addNewLogIsOpen) {
            return <NewLog />
        }
        else {
            return
        }
    }

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
