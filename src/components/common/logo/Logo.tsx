import logoImg from "@/assets/logo.svg"
import {ReactSVG} from "react-svg";

function Logo () {
    return (<div>
        <ReactSVG src={logoImg}/>
    </div>)
}

export default Logo