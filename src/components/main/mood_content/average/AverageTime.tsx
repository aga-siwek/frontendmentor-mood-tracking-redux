
import increaseIcon from "@/assets/icon-trend-increase-white.svg";
import equalIcon from "@/assets/icon-trend-same-white.svg";
import decreaseIcon from "@/assets/icon-trend-decrease-white.svg";
import sleepIcon from "@/assets/icon-sleep-white.svg";
import {ReactSVG} from "react-svg";



function AverageTime({averageSleepTime=3, prevAverageSleepTime=2}) {

    const iconSwitch = () => {
        if (averageSleepTime === "unknow") {
            return
        } else {
            return <ReactSVG src={sleepIcon} className=""/>
        }
    }

    const sleepIconChange = () => {
        if (averageSleepTime === "unknow") {
            return
        }
        if (averageSleepTime > prevAverageSleepTime) {
            return <ReactSVG src={increaseIcon} className=""/>
        } else if (averageSleepTime === prevAverageSleepTime) {
            return <ReactSVG src={equalIcon} className=""/>
        } else if (averageSleepTime < prevAverageSleepTime) {
            return <ReactSVG src={decreaseIcon} className=""/>
        } else {
            return <ReactSVG src={equalIcon} className=""/>
        }
    }

    const sleepTextChange = () => {
        if (averageSleepTime === "unknow") {
            return <p className="">Track 5 nights to view average sleep.</p>
        }
        if (prevAverageSleepTime === "unknow") {
            return <p className="">Lack of data</p>
        }
        if (averageSleepTime > prevAverageSleepTime) {
            return <p className="text-start text-neutral-5 font-light text-[15px] tracking-[-0.3px]">Increase from the previous 5 check-ins</p>
        } else if (averageSleepTime === prevAverageSleepTime) {
            return <p className="text-start text-neutral-5 font-light text-[15px] tracking-[-0.3px]">Same as the previous 5 check-ins</p>
        } else if (averageSleepTime < prevAverageSleepTime) {
            return <p className="text-start text-neutral-5 font-light text-[15px] tracking-[-0.3px]">Decrease from the previous 5 check-ins</p>
        } else {
            return <p className="text-start text-neutral-5 font-light text-[15px] tracking-[-0.3px]">Lack of data</p>
        }
    }

    const sleepTimeSwitch = () => {
        switch (averageSleepTime) {
            case "unknow":
                return <p className="text-neutral-5 font-semibold text-[24px] leading-[1.4]">Not enough data yet!</p>
            case 0:
                return <p className="text-neutral-5 font-semibold text-[24px] leading-[1.4]">0-2 hours</p>
            case 1:
                return <p className="text-neutral-5 font-semibold text-[24px] leading-[1.4]">3-4 hours</p>
            case 2:
                return <p className="text-neutral-5 font-semibold text-[24px] leading-[1.4]">5-6 hours</p>
            case 3:
                return <p className="text-neutral-5 font-semibold text-[24px] leading-[1.4]">7-8 hours</p>
            case 4:
                return <p className="text-neutral-5 font-semibold text-[24px] leading-[1.4]">9+ hours</p>
        }
    }


    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-1 justify-start">
                <p className="text-neutral-1 font-semibold text-[18px] leading-[1.4]">Average Time</p>
                <p className="text-neutral-2 font-light text-[18px] leading-[1.4]">(Last 5 check-ins)</p>
            </div>
            <div className="flex flex-col justify-center items-start bg-accent-2 px-4 py-5 rounded-4xl min-h-36 gap-3 bg-[url(@/assets/bg-pattern-averages.svg)] bg-no-repeat bg-position-[right_-120px_center]">
                <div className="flex gap-3">
                    {iconSwitch()}
                    {sleepTimeSwitch()}
                </div>
                <div className="flex gap-3 justify-center items-start">
                    {sleepIconChange()}
                    {sleepTextChange()}
                </div>
            </div>
        </div>
    )
}

export default AverageTime