import "./App.css";
import MainContent from "@/components/main/MainContent.tsx";
import Login from "@/components/login/Login.tsx";
import Register from "@/components/register/Register.tsx";
import { APP_STATE } from "@/store/constants";
import { fetchLogs } from "@/store/slices/logsSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.auth.appState);

  const loading = useAppSelector((state) => state.logs.logsLoading);

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
