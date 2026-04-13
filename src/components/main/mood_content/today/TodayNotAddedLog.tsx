import { Button } from "@/components/ui/button.tsx";
import { useAppDispatch } from "@/store/store";
import { openLogAdded } from "@/store/slices/uiSlice";

function TodayNotAddedLog() {
  const dispatch = useAppDispatch();
  const onLogAddClicked = () => {
    dispatch(openLogAdded());
  };
  return (
    <Button
      type="submit"
      form="form-rhf-input"
      className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] p-6 rounded-md max-w-[226px] cursor-pointer"
      onClick={onLogAddClicked}
    >
      Log today's mood
    </Button>
  );
}
export default TodayNotAddedLog;
