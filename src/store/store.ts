import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import authReducer from "@/store/slices/authSlice";
import logsReducer from "@/store/slices/logsSlice";
import newLogReducer from "@/store/slices/newLogSlice";
import statisticsReducer from "@/store/slices/statisticsSlice";
import uiReducer from "@/store/slices/uiSlice";
import { listenerMiddleware } from "@/store/listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logsReducer,
    newLog: newLogReducer,
    statistics: statisticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type RootState = AppState;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
