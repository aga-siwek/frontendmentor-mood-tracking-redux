
import veryHappyIcon from "@/assets/icon-very-happy-white.svg";
import happyIcon from "@/assets/icon-happy-white.svg";
import neutralIcon from "@/assets/icon-neutral-white.svg";
import sadIcon from "@/assets/icon-sad-white.svg";
import verySad from "@/assets/icon-very-sad-white.svg";
import increaseIcon from "@/assets/icon-trend-increase.svg"
import decreaseIcon from "@/assets/icon-trend-decrease.svg"
import equalIcon from "@/assets/icon-trend-same.svg"
import {ReactSVG} from "react-svg";
import bgPattern from "@/assets/bg-pattern-averages.svg"

function AverageMood({averageMood=2, prevAverageMood=3}) {

    const iconSwitch = () => {
        switch (averageMood) {
            case 2:
                return <ReactSVG src={veryHappyIcon} className="w-6 h-6"/>
            case 1:
                return <ReactSVG src={happyIcon} className="w-6 h-6"/>
            case 0:
                return <ReactSVG src={neutralIcon} className="w-6 h-6"/>
            case -1:
                return <ReactSVG src={sadIcon} className="w-6 h-6"/>
            case -2:
                return <ReactSVG src={verySad} className="w-6 h-6"/>
            default: return null
        }
    }

    const feelSwitch = () => {
        switch (averageMood) {
            case 2:
                return <p className="text-neutral-1 font-semibold text-[24px] leading-[1.4]">Very Happy</p>
            case 1:
                return <p className="text-neutral-1 font-semibold text-[24px] leading-[1.4]">Happy</p>
            case 0:
                return <p className="text-neutral-1 font-semibold text-[24px] leading-[1.4]">Neutral</p>
            case -1:
                return <p className="text-neutral-1 font-semibold text-[24px] leading-[1.4]">Sad</p>
            case -2:
                return <p className="text-neutral-1 font-semibold text-[24px] leading-[1.4]">Very Sad</p>
            default:
                return <p className="text-neutral-1 font-semibold text-[24px] leading-[1.4]">Keep tracking!</p>
        }
    }

    const feelIconChange = () => {
        if (averageMood > prevAverageMood) {
            return <ReactSVG src={increaseIcon} className="w-6 h-6"/>
        } else if (averageMood === prevAverageMood) {
            return <ReactSVG src={equalIcon} className="w-6 h-6"/>
        } else if (averageMood < prevAverageMood) {
            return <ReactSVG src={decreaseIcon} className="w-6 h-6"/>
        } else {
            return <ReactSVG src={equalIcon} className="w-6 h-6"/>
        }
    }

    const feelTextChange = () => {
        if (averageMood > prevAverageMood) {
            return <p className="text-start text-neutral-1 font-light text-[15px] tracking-[-0.3px]">Increase from the previous 5 check-ins</p>
        } else if (averageMood === prevAverageMood) {
            return <p className="text-start text-neutral-1 font-light text-[15px] tracking-[-0.3px]">Same as the previous 5 check-ins</p>
        } else if (averageMood < prevAverageMood) {
            return <p className="text-start text-neutral-1 font-light text-[15px] tracking-[-0.3px]">Decrease from the previous 5 check-ins</p>
        } else {
            return <p className="text-start text-neutral-1 font-light text-[15px] tracking-[-0.3px]">Log 5 check-ins to see your average mood.</p>
        }
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-2 min-5">
                <p className="text-neutral-1 font-semibold text-[20px] leading-[1.4]">Average Mood</p>
                <p className="text-neutral-2 font-light text-[18px] leading-[1.4]">(Last 5 check-ins)</p>
            </div>
            <div className="flex flex-col justify-center items-start bg-detail-5 px-4 py-5 rounded-4xl min-h-36 gap-3 bg-[url(@/assets/bg-pattern-averages.svg)] bg-no-repeat bg-position-[right_-120px_center]">
                <div className="flex gap-3">
                    {iconSwitch()}
                    {feelSwitch()}
                </div>
                <div className="flex gap-3 justify-center items-start">
                    {feelIconChange()}
                    {feelTextChange()}
                </div>
            </div>
        </div>
    )
}

export default AverageMood;
