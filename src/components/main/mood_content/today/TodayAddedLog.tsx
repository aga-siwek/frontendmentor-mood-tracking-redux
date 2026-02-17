import TodayFeeling from "@/components/main/mood_content/today/TodayFeeling.tsx";
import TodaySleep from "@/components/main/mood_content/today/TodaySleep.tsx";
import TodayReflection from "@/components/main/mood_content/today/TodayReflection.tsx";

function TodayAddedLog () {
    return (
        <div className="flex flex-col lg:flex-row  gap-5">
            <TodayFeeling />
            <div className="flex flex-col gap-5">
            <TodaySleep />
            <TodayReflection />
            </div>

        </div>
    )
}
export default TodayAddedLog