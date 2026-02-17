import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { listenerMiddleware } from "./appSlice.ts";

export default configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
