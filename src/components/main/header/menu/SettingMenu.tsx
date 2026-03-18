import { ReactSVG } from "react-svg";
import settingIcon from "@/assets/icon-settings.svg";
import logOutIcon from "@/assets/icon-logout.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout, openSetting } from "@/store/appSlice.ts";
import type { RootState } from "@/store/store.ts";

export function SettingMenu() {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.app.userName);
  const userEmail = useSelector((state) => state.app.userEmail);

  const onSettingClick = () => {
    dispatch(openSetting());
  };

  const onLogOutClick = () => {
    dispatch(logout());
  };

  const showUserEmail = () => {
    if (userEmail === undefined) {
      return "No user email found";
    }
    return userEmail;
  };

  const showUserName = () => {
    if (userName === undefined) {
      return "Stranger";
    }
    return userName;
  };
  return (
    <div className="flex flex-col bg-neutral-5 absolute right-3 top-15 px-4 py-3 rounded-lg gap-3">
      <div className="flex flex-col gap-3">
        <p className="text-[18px] leading-[1.2] text-neutral-1">
          {showUserName()}
        </p>
        <p className="text-[15px] tracking-[-0.3px] text-neutral-3">
          {showUserEmail()}
        </p>
      </div>
      <hr className="border-t border-solid border-accent-3" />
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-2.5 cursor-pointer items-center hover:outline hover:outline-neutral-4 hover:rounded-md "
          onClick={onSettingClick}
        >
          <ReactSVG src={settingIcon} className="h-6 w-6 fill-black" />
          <p>Setting</p>
        </div>
        <div
          className="flex gap-2.5 cursor-pointer items-center hover:outline hover:outline-neutral-4 hover:rounded-md "
          onClick={onLogOutClick}
        >
          <ReactSVG src={logOutIcon} className="h-6 w-6 fill-black" />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}
export default SettingMenu;
