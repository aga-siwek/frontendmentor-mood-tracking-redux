import Header from "@/components/main/header/Header.tsx";
import Title from "@/components/main/mood_content/title/Title.tsx";
import MoodContent from "@/components/main/mood_content/MoodContent.tsx";

function MainContent() {
    return (
        <div className="flex flex-col gap-12 p-3">
            <Header />
            <Title />
            <MoodContent />
        </div>
    )
}

export default MainContent

