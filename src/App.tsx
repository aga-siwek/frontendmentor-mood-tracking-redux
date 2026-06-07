import "./App.css";
import MainContent from "@/components/main/MainContent.tsx";
import Login from "@/components/login/Login.tsx";
import Register from "@/components/register/Register.tsx";
import { APP_STATE } from "@/store/constants";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Spinner } from "@/components/ui/spinner";

function App() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.auth.appState);

  const logsLoading = useAppSelector((state) => state.logs.logsLoading);
  const sessionLoading = useAppSelector((state) => state.auth.sessionLoading);

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
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  if (sessionLoading || logsLoading) return <div className="flex h-screen w-full items-center justify-center"><Spinner /></div>;

  return (
    <div className="flex flex-col max-w-7xl p-4 justify-center w-full">
      <Toaster />
      {showContent()}
    </div>
  );
}

export default App;
