
import NewFeels from "./NewFeels.jsx";
import NewDescription from "./NewDescription.jsx";
import NewMood from "./NewMood.jsx";
import NewSleepTime from "./NewSleepTime.jsx";
import { useSelector, useDispatch } from "react-redux";
import {closeLogAdded} from "@/store/appSlice.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import Process from "@/components/main/newLog/Process.tsx";

function NewLog() {
    const processLevel = useSelector((state) => state.app.process)
    console.log(processLevel, "process level from new log")
    const dispatch = useDispatch();
    const showQuestionnaire = () => {
        if (processLevel === 1) {
            return <NewMood/>
        }
        if (processLevel === 2) {
            return <NewFeels/>
        }
        if (processLevel === 3) {
            return <NewDescription/>
        }
        if (processLevel === 4) {
            return <NewSleepTime/>
        }
    }
    const closeAddNewLog = () => {
        dispatch(closeLogAdded())
    }

    return (
        <div className="flex flex-col gap-8 justify-center items-center bg-neutral-1-transparent p-2 fixed top-0 left-0 w-full h-full">
            <Card className="flex flex-col gap-1 items-start w-full max-w-150 px-4 py-10 bg-background">
                <div className="flex justify-end w-full cursor-pointer" onClick={closeAddNewLog}>
                    <p className="text-base text-neutral-3">&#10005;</p>
                </div>
                <div className="flex flex-col gap-8 items-start w-full max-w-150 px-4 py-0 ">
                <CardHeader className="flex flex-col text-start w-full text-neutral-1 px-0">
                    <CardTitle className="font-bold text-[32px] leading-[1.4] tracking-[-0.3px]">Log your mood
                    </CardTitle>
                </CardHeader>
                <Process />
                <CardContent className="flex flex-col gap-5 w-full justify-start px-0">
                    {showQuestionnaire()}
                </CardContent>
                </div>
            </Card>
        </div>
    );
}

export default NewLog;