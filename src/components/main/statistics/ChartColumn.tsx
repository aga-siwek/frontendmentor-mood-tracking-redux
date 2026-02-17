import veryHappyIcon from "../../../assets/icon-very-happy-white.svg"
import happyIcon from "../../../assets/icon-happy-white.svg";
import neutralIcon from "../../../assets/icon-neutral-white.svg";
import sadIcon from "../../../assets/icon-sad-white.svg";
import verySadIcon from "../../../assets/icon-very-sad-white.svg";
import {ReactSVG} from "react-svg";
import ColumnInfo from "./ColumnInfo.jsx";

function ChartColumn({
                         createdAtYear,
                         createdAtMonth,
                         createdAtDay,
                         description,
                         mood,
                         feels,
                         sleepTime
                     }) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    let moodIcon
    let moodClass
    let sleepClass

    const showMonth = () => {
        return (months[createdAtMonth - 1])
    }
    const showDay = () => {
        if (createdAtDay < 10) {
            return ("0" + createdAtDay)
        }
        return createdAtDay
    }

    const showMood = () => {
        switch (mood) {
            case -2:
                moodIcon = verySadIcon;
                moodClass = "bg-detail-2";
                break;
            case -1:
                moodIcon = sadIcon;
                moodClass = "bg-detail-3";
                break;
            case 0:
                moodIcon = neutralIcon;
                moodClass = "bg-detail-4";
                break;
            case 1:
                moodIcon = happyIcon;
                moodClass = "bg-detail-5";
                break;
            case 2:
                moodIcon = veryHappyIcon;
                moodClass = "bg-detail-6";
                break;
        }
    }

    const showSleepTime = () => {
        switch (sleepTime) {
            case 0:
                sleepClass = "h-[calc((263px/5)*1)]"
                break;
            case 1:
                sleepClass = "h-[calc((263px/5)*2)]"
                break;
            case 2:
                sleepClass = "h-[calc((263px/5)*3)]"
                break;
            case 3:
                sleepClass = "h-[calc((263px/5)*4)]"
                break;
            case 4:
                sleepClass = "h-[254px]"
                break;
        }
    }

    showMood()
    showSleepTime()

    return (
        <div className="flex flex-col gap-3">
            <div className={`flex flex-col items-center ${sleepClass} group relative cursor-pointer `}>
                <div className={`w-10 text-center text-neutral-5 h-full ${moodClass} relative rounded-full p-1`}>
                    <ReactSVG src={moodIcon}/>
                    <div className="absolute bottom-[10%] left-1/2 -translate-x-[110%] whitespace-normal z-50 transition-opacity duration-300 w-[219px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                        <ColumnInfo
                            description={description}
                            mood={mood}
                            feels={feels}
                            sleepTime={sleepTime}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1.5 justify-center items-center">
                <div className="text-[12px] leading-[1.1] text-neutral-2"> {showMonth()}</div>
                <div className="text-[12px] font-extrabold text-neutral-1"> {showDay()}</div>
            </div>
        </div>
    )
}

export default ChartColumn;