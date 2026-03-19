import "./App.css";
import MainContent from "@/components/main/MainContent.tsx";
import Login from "@/components/login/Login.tsx";
import Register from "@/components/register/Register.tsx";
import { APP_STATE, fetchLogs } from "@/store/appSlice.ts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "@/store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const appState = useSelector((state: RootState) => state.app.appState);

  const loading = useSelector((state: RootState) => state.app.logsLoading);

  const showContent = () => {
    if (appState === APP_STATE.LOGOUT) {
      return <Login />;
    }
    if (appState === APP_STATE.REGISTER) {
      return <Register />;
    } else {
      return <MainContent />;
    }
  };

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (loading) return <p>Loading data from API...</p>;

  return (
    <div className="flex flex-col max-w-7xl p-4 justify-center w-full">
      {showContent()}
    </div>
  );
}

export default App;
