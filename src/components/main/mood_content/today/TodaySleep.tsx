import {ReactSVG} from "react-svg";
import sleepIcon from "@/assets/icon-sleep.svg"

function TodaySleep({sleepTime=2}) {
    const sleepTimeSwitch = () => {
        switch (sleepTime) {
            case 0:
                return "0-2 hours"
            case 1:
                return "3-4 hours"
            case 2:
                return "5-6 hours"
            case 3:
                return "7-8 hours"
            case 4:
                return "9+ hours"
        }
    }
    return (
        <div className="flex flex-col justify-start items-start gap-4 bg-neutral-5 rounded-2xl p-5 lg:h-1/3 ">
            <div className="flex gap-4 justify-center items-center">
                <ReactSVG src={sleepIcon} className="w-6"></ReactSVG>
                <p className="text-neutral-2 text-[18px] leading-[1.2]">Sleep</p>
            </div>
            <div className="text-neutral-1 font-bold text-[32px] leading-[1.4] tracking-[-0.3px]">{sleepTimeSwitch()}</div>
        </div>
    )
}

export default TodaySleep;
