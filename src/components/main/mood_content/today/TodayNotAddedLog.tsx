import { Button } from "@/components/ui/button.tsx";
import { useDispatch } from "react-redux";
import {openLogAdded} from "@/store/appSlice.ts";

function TodayNotAddedLog() {
  const dispatch = useDispatch();
  const onLogAddClicked = () => {
    dispatch(openLogAdded())
  }
  return (
    <Button
      type="submit"
      form="form-rhf-input"
      className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] p-6 rounded-md max-w-[226px]"
      onClick={onLogAddClicked}
    >
      Log today's mood
    </Button>
  );
}
export default TodayNotAddedLog;
