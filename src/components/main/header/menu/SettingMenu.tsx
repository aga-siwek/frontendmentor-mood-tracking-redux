import {ReactSVG} from "react-svg";
import settingIcon from "@/assets/icon-settings.svg"
import logOutIcon from "@/assets/icon-logout.svg"
import { useDispatch } from "react-redux";
import {logout, openSetting} from "@/store/appSlice.ts";

export function SettingMenu() {
  const dispatch = useDispatch();

  const onSettingClick = () => {
    dispatch(openSetting())
  }

  const onLogOutClick = () => {
    dispatch(logout())
  }
  return (
      <div className="flex flex-col bg-neutral-5 absolute right-3 top-15 px-4 py-3 rounded-lg gap-3">
        <div className="flex flex-col gap-3">
          <p className="text-[18px] leading-[1.2] text-neutral-1">Jane Doe</p>
          <p className="text-[15px] tracking-[-0.3px] text-neutral-3">jane.doe@gmail.com</p>
        </div>
        <hr className="border-t border-solid border-accent-3"/>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2.5 cursor-pointer items-center hover:border hover:border-neutral-4 hover:rounded-md hover:py-2" onClick={onSettingClick}>
            <ReactSVG src={settingIcon} className="h-6 w-6 fill-black"/>
            <p>Setting</p>
          </div>
          <div className="flex gap-2.5 cursor-pointer items-center hover:border hover:border-neutral-4 hover:rounded-md hover:py-2" onClick={onLogOutClick}>
            <ReactSVG src={logOutIcon} className="h-6 w-6 fill-black"/>
            <p>Log out</p>
          </div>
        </div>

      </div>
  )

}
export default SettingMenu;
