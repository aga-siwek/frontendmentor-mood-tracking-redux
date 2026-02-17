import Today from "@/components/main/mood_content/today/Today.tsx";
import Average from "@/components/main/mood_content/average/Average.tsx";
import Statistics from "@/components/main/statistics/Statistics.tsx";

function MoodContent () {
    return (
        <div className="flex flex-col gap-8">
            <Today />
            <Average />
            <Statistics />
        </div>
    )
}
export default MoodContent