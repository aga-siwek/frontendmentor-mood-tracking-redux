
import ChartColumn from "./ChartColumn.jsx";
import {ReactSVG} from "react-svg";
import sleepIcon from "../../../assets/icon-sleep.svg"
import {useEffect, useRef} from "react";
import testData from "@/test_data.json"


function Chart() {
    const logs = testData

    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, []);

    // useEffect(() => {
    //     if (chartRef.current) {
    //         chartRef.current.scrollLeft = chartRef.current.scrollWidth;
    //     }
    // }, [logs]);

    const showLog = () => {
        let shownLogs
        if (logs) {
            const logsNumber = logs.length
            if (logsNumber >= 11) {
                shownLogs = logs.slice(-11)
            } else {
                shownLogs = logs
            }
            return shownLogs.map(log => {
                const createdAt = log.created_at
                const createdAtYear = log.created_at_year
                const createdAtMonth = log.created_at_month
                const createdAtDay = log.created_at_day
                const description = log.description.description
                const mood = log.mood.mood_scale
                const feels = log.feels
                const sleepTime = log.sleep.sleep_time_scale

                return <ChartColumn
                    key={createdAt}
                    createdAtYear={createdAtYear}
                    createdAtMonth={createdAtMonth}
                    createdAtDay={createdAtDay}
                    description={description}
                    mood={mood}
                    feels={feels}
                    sleepTime={sleepTime}/>
            })
        }
    }

    return (
        <div className="flex w-full">
            <div className="flex w-full h-90 overflow-x-auto overflow-y-hidden pb-2.5">
                <div className="flex flex-col gap-[calc(100%/6)] justify-start h-[263px] text-3 min-w-17 text-end mr-2 pb-8 px-1">
                    <div className="flex gap-1">
                        <ReactSVG src={sleepIcon} className="h-2.5 w-2.5"/>
                        <p className="text-xs leading-[1.1] text-neutral-2">9+ hours</p>
                    </div>
                    <div className="flex gap-1.5">
                        <ReactSVG src={sleepIcon} className="h-2.5 w-2.5"/>
                        <p className="text-xs leading-[1.1] text-neutral-2">7-8 hours</p>
                    </div>
                    <div className="flex gap-1.5">
                        <ReactSVG src={sleepIcon} className="h-2.5 w-2.5"/>
                        <p className="text-xs leading-[1.1] text-neutral-2">5-6 hours</p>
                    </div>
                    <div className="flex gap-1.5">
                        <ReactSVG src={sleepIcon} className="h-2.5 w-2.5"/>
                        <p className="text-xs leading-[1.1] text-neutral-2">3-4 hours</p>
                    </div>
                    <div className="flex gap-1.5">
                        <ReactSVG src={sleepIcon} className="h-2.5 w-2.5"/>
                        <p className="text-xs leading-[1.1] text-neutral-2">0-2 hours</p>
                    </div>
                </div>
                <div className="flex h-78 w-[65vw] overflow-y-scroll pb-1" ref={scrollRef}>
                    <div className="flex gap-3 items-end h-full px-2.5 ">
                        {showLog()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart;