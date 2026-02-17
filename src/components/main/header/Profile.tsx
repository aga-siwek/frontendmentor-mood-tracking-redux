import {ReactSVG} from "react-svg";
import placeholder from "@/assets/avatar-placeholder.svg"
import icon_dropdown from "@/assets/icon-dropdown-arrow.svg"

function Profile() {
    return (
        <div className="flex justify-center items-center gap-3">
            <ReactSVG src={placeholder} />
            <ReactSVG src={icon_dropdown} />
        </div>
    )
}
export default Profile
