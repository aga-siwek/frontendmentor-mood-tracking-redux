import "./App.css";
import MainContent from "@/components/main/MainContent.tsx";
import Login from "@/components/login/Login.tsx";
import Register from "@/components/register/Register.tsx";
import {APP_STATE, downloadLog} from "@/store/appSlice.ts";
import { useSelector, useDispatch } from "react-redux";

function App() {
    console.log("App is running");
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app.appState)

    dispatch(downloadLog())

    const showContent = () => {
        if (appState === APP_STATE.LOGOUT) {
            return <Login />
        }
        if (appState === APP_STATE.REGISTER) {
            return <Register />
        }
        else {return <MainContent />}
    }
  return (
    <div className="flex flex-col max-w-7xl p-4 justify-center w-full">
        {showContent()}
    </div>
  );
}

export default App;
