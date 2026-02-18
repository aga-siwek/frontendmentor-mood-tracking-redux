import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";

export const APP_STATE = {
    LOGOUT: "logout",
    REGISTER: "register",
    USER_NAME_NOT_ADDED: "userNameNoNotAdded",
    TODAY_LOG_ADDED: "today_log_added",
    TODAY_LOG_NOT_ADDED: "today_log_not_added",
};

interface AppState {
    appState: string;
}

const initialState: AppState = {
    appState: APP_STATE.LOGOUT,
};

export const appSlice = createSlice({
  name: "app",
initialState,

  reducers: {
      login: () => {},
      register: () => {},
      isTodayMoodLogged: () => {},
      hasUserName: () => {},
      addTodayMood: () => {},
      deleteTodayMood: () => {},
      changeUserName: () => {},
      logout: () => {},
  },
});
export const listenerMiddleware = createListenerMiddleware();

export const { login, register, addTodayMood, deleteTodayMood, changeUserName, isTodayMoodLogged, hasUserName, logout } = appSlice.actions;

export default appSlice.reducer;
