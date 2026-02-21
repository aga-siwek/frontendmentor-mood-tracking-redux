import quote from "@/assets/icon-quote.svg";
import { ReactSVG } from "react-svg";
import veryHappyIcon from "@/assets/icon-very-happy-color.svg";
import happyIcon from "@/assets/icon-happy-color.svg";
import neutralIcon from "@/assets/icon-neutral-color.svg";
import sadIcon from "@/assets/icon-sad-color.svg";
import verySad from "@/assets/icon-very-sad-color.svg";
import QuoteContainer from "./QuoteContainer.jsx";

function TodayFeeling({ mood = 0, feels = ["Joyful", "Down", "Anxious"] }) {
  const iconSwitch = () => {
    switch (mood) {
      case 2:
        return (
          <ReactSVG
            src={veryHappyIcon}
            className="max-w-3xs w-full md:max-w-[320px]"
          />
        );
      case 1:
        return (
          <ReactSVG
            src={happyIcon}
            className="max-w-3xs w-full md:max-w-[320px]"
          />
        );
      case 0:
        return (
          <ReactSVG
            src={neutralIcon}
            className="max-w-3xs w-full md:max-w-[320px]"
          />
        );
      case -1:
        return (
          <ReactSVG
            src={sadIcon}
            className="max-w-3xs w-full md:max-w-[320px]"
          />
        );
      case -2:
        return (
          <ReactSVG
            src={verySad}
            className="max-w-3xs w-full md:max-w-[320px]"
          />
        );
    }
  };
  const feelSwitch = () => {
    switch (mood) {
      case 2:
        return "Very Happy";
      case 1:
        return "Happy";
      case 0:
        return "Neutral";
      case -1:
        return "Sad";
      case -2:
        return "Very Sad";
    }
  };

  return (
    <div className="flex flex-col justify-center gap-8 bg-neutral-5 rounded-2xl py-8 px-4 md:relative md:justify-between  items-center md:items-start md:h-85 md:overflow-hidden lg:w-full">
      <div className="flex flex-col">
        <p className="font-semibold text-neutral-1 opacity-75 text-[32px] leading-[1.4] tracking-[-0.3px] text-shadow-lg">
          I’m feeling
        </p>
        <p className="font-semibold text-neutral-1 text-[40px] leading-[1.2] tracking-[-0.3px]">
          {feelSwitch()}
        </p>
      </div>
      <div className="flex justify-center w-full md:absolute md:top-1/8 md:-right-35 ">
        {" "}
        {iconSwitch()}
      </div>
      <div className="flex flex-col gap-4 justify-center items-center md:items-start md:w-60">
        <div className="">
          <ReactSVG src={quote} className="w-6 h-6"></ReactSVG>
        </div>
        <QuoteContainer mood={mood} feels={feels} />
      </div>
    </div>
  );
}

export default TodayFeeling;
