import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { fetchLogin } from "@/store/slices/authSlice";
import { fetchLogs, fetchNewLog } from "@/store/slices/logsSlice";
import { generateRandomNumber } from "@/store/slices/uiSlice";

export const listenerMiddleware = createListenerMiddleware();

// After saving a new log or logging in — refresh data
listenerMiddleware.startListening({
  matcher: isAnyOf(fetchNewLog.fulfilled, fetchLogin.fulfilled),
  effect: async (_action, listenerApi) => {
    await listenerApi.dispatch(fetchLogs());
  },
});

// Po zapisaniu nowego logu lub logowaniu — nowy losowy cytat/refleksja
listenerMiddleware.startListening({
  matcher: isAnyOf(fetchNewLog.fulfilled, fetchLogin.fulfilled),
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(generateRandomNumber());
  },
});
