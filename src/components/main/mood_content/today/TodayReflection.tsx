import Reflections from "@/reflections.json";
import { ReactSVG } from "react-svg";
import refIcon from "@/assets/icon-reflection.svg";
import { useAppSelector } from "@/store/store";

function TodayReflection() {
  const feels = useAppSelector((state) => state.newLog.todayFeels);
  const mood = useAppSelector((state) => state.newLog.todayMood);
  const randomReflections = [
    "Every feeling is valid, even the quiet ones.",
    "You made it through today — and that matters.",
    "Not every day needs to be productive to be meaningful.",
    "Your mood is a message, not your identity.",
    "It’s okay to pause — rest is part of progress.",
    "Emotions change, and so will this moment.",
    "You don’t have to feel good to be doing good.",
    "Some days surviving is enough.",
    "You can grow even in uncertainty.",
    "Name it, feel it, let it pass.",
  ];
  const randomNumber = useAppSelector(
    (state) => state.ui.randomNumber,
  );
  let selectReflection;
  const reflectionSwitch = Reflections.map((reflection) => {
    if (reflection.mood_scale === mood) {
      if (
        [...reflection.feels].sort((a, b) => a - b).join(",") ===
        [...feels].sort((a, b) => a - b).join(",")
      ) {
        selectReflection = reflection.reflection;
        return (
          <div className="flex flex-col justify-start items-start gap-4 bg-neutral-5 rounded-2xl p-5 lg:h-full lg:justify-between">
            <div className="flex flex-col justify-start items-start gap-4 bg-neutral-5 rounded-2xl p-5">
              <div className="flex gap-4 items-center">
                <ReactSVG src={refIcon} className="w-6" />
                <p className="">Reflection of the day</p>
              </div>
              <p className="text-neutral-1 font-light text-[18px] leading-[1.2] text-start">
                {" "}
                {selectReflection}
              </p>
            </div>
            <div className=""></div>
          </div>
        );
      }
    }
  });
  if (selectReflection) {
    return reflectionSwitch;
  } else {
    return (
      <div className="flex flex-col justify-start items-start gap-4 bg-neutral-5 rounded-2xl p-5 lg:h-full lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <ReactSVG src={refIcon} className="w-6" />
            <p className="text-neutral-2 text-[18px] leading-[1.2]">
              Reflection of the day
            </p>
          </div>
          <p className="text-neutral-1 font-light text-[18px] leading-[1.2] text-start">
            {" "}
            {randomReflections[randomNumber]}
          </p>
        </div>
        <div className="flex gap-3">
          {feels.map((feel) => (
            <p className="text-neutral-2" key={feel}>
              #{feel}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default TodayReflection;
