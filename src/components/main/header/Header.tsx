import Logo from "@/components/common/logo/Logo.tsx";
import Profile from "@/components/main/header/Profile.tsx";
import SettingMenu from "@/components/main/header/menu/SettingMenu.tsx";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { closeSettingMenu } from "@/store/slices/uiSlice";

function Header() {
  const dispatch = useAppDispatch();
  const settingMenuIsOpen = useAppSelector((state) => state.ui.settingMenuIsOpen);

  return (
    <div className="flex justify-between items-center">
      <Logo />
      <Profile />
      {settingMenuIsOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => dispatch(closeSettingMenu())} />
          <SettingMenu />
        </>
      )}
    </div>
  );
}

export default Header;
