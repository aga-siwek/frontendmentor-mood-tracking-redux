import veryHappyIcon from "@/assets/icon-very-happy-color.svg"
import happyIcon from "@/assets/icon-happy-color.svg"
import neutralIcon from "@/assets/icon-neutral-color.svg"
import sadIcon from "@/assets/icon-sad-color.svg"
import verySadIcon from "@/assets/icon-very-sad-color.svg"
import {ReactSVG} from "react-svg";

function ColumnInfo({
                        description = "unknow",
                        mood = "unknow",
                        feels = ["a",],
                        sleepTime = "unknow"
                    }) {

    const moodSwitch = () => {
        switch (mood) {
            case -2:
                return (<div className="flex gap-1">
                        <ReactSVG src={verySadIcon} className="w-4"/>
                        <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">Very Sad</p>
                    </div>)
            case -1:
                return (<div className="flex gap-1">
                    <ReactSVG src={sadIcon} className="w-4"/>
                    <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">Sad</p>
                    </div>)
            case 0:
                return (<div className="flex gap-1">
                    <ReactSVG src={neutralIcon} className="w-4"/>
                <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">Neutral</p>
                </div>)
            case 1:
                return (<div className="flex gap-1">
                    <ReactSVG src={happyIcon} className="w-4"/>
                <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">Happy</p>
                </div>)
            case 2:
                return (<div className="flex gap-1">
                    <ReactSVG src={veryHappyIcon} className="w-4"/>
                <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">Very Happy</p>
                </div>)
        }
    }

    const timeSwitch = () => {
        switch (sleepTime) {
            case 0:
                return <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">0-2 hours</p>
            case 1:
                return <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">3-4 hours</p>
            case 2:
                return <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">5-6 hours</p>
            case 3:
                return <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">7-8 hours</p>
            case 4:
                return <p className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">9+ hours</p>
        }
    }

    return (
        <div className="flex flex-col justify-start items-start gap-3 bg-neutral-5 text-neutral-1 px-1.5 py-2.5 rounded-[10px] border-solid border h-full min-w-50 flex-wrap ">
            <div className="flex flex-col gap-2 justify-start items-start">
                <div className="text-s font-semibold text-neutral-2">Mood</div>
                <div className="">
                    <div className="flex flex-col text-base leading-[1.4] tracking-[-0.3px]">{moodSwitch()}</div>
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
                <p className="text-s font-semibold text-neutral-2">Sleep</p>
                <div className="">{timeSwitch()}</div>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
                <p className="text-s font-semibold text-neutral-2">Reflection</p>
                <div className="">{description}</div>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start">
                <p className="text-s font-semibold text-neutral-2">Tags</p>
                <div className="flex gap-1">
                    {feels.map((feel, index) => <div key={feel + index}
                                                     className="text-base leading-[1.4] tracking-[-0.3px]">{feel.feel_name}</div>)}
                </div>
            </div>
        </div>
    )
}

export default ColumnInfo;