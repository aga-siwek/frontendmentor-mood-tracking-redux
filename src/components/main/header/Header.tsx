import Logo from "@/components/common/logo/Logo.tsx";
import Profile from "@/components/main/header/Profile.tsx";

function Header() {
    return (
        <div className="flex justify-between items-center">
            <Logo />
            <Profile />
        </div>
    )
}

export default Header
