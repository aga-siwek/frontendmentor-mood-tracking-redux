import { ReactSVG } from "react-svg";
import placeholder from "@/assets/avatar-placeholder.svg";
import icon_dropdown from "@/assets/icon-dropdown-arrow.svg";
import { useAppDispatch } from "@/store/store";
import { clickSettingMenu } from "@/store/slices/uiSlice";

function Profile() {
  const dispatch = useAppDispatch();
  const onProfileClick = () => {
    dispatch(clickSettingMenu());
  };
  return (
    <div
      className="flex justify-center items-center gap-3"
      onClick={onProfileClick}
    >
      <ReactSVG src={placeholder} />
      <ReactSVG src={icon_dropdown} />
    </div>
  );
}
export default Profile;
