import { configureStore } from "@reduxjs/toolkit";
import appReducer, { listenerMiddleware } from "./appSlice.ts";

export default configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
