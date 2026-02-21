import Logo from "@/components/common/logo/Logo.tsx";
import Profile from "@/components/main/header/Profile.tsx";
import SettingMenu from "@/components/main/header/menu/SettingMenu.tsx";
import { useSelector } from "react-redux";

function Header() {
    const settingMenuIsOpen = useSelector((state) => state.app.settingMenuIsOpen)

    const showSettingMenu = () => {
        if (settingMenuIsOpen) {
            return <SettingMenu />
        }
        else {return}
    }

  return (
    <div className="flex justify-between items-center">
      <Logo />
      <Profile />
        {showSettingMenu()}

    </div>
  );
}

export default Header;
