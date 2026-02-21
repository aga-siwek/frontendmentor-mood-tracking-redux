import AverageMood from "@/components/main/mood_content/average/AverageMood.tsx";
import AverageTime from "@/components/main/mood_content/average/AverageTime.tsx";

function Average() {
  return (
    <div className="flex flex-col justify-start items-start gap-6 bg-neutral-5 rounded-2xl p-5 w-full">
      <AverageMood />
      <AverageTime />
    </div>
  );
}

export default Average;
