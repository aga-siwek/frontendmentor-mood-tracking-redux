import { createSlice } from "@reduxjs/toolkit";
import { logout } from "@/store/actions";
import { fetchLogs } from "@/store/slices/logsSlice";

export interface StatisticsState {
  averageMood?: number;
  previousAverageMood?: number;
  averageSleepTime?: number;
  previousAverageSleepTime?: number;
}

const initialState: StatisticsState = {
  averageMood: undefined,
  previousAverageMood: undefined,
  averageSleepTime: undefined,
  previousAverageSleepTime: undefined,
};

const calcAverage = (logs: any[], key: (log: any) => number): number =>
  Math.round(logs.reduce((sum, log) => sum + key(log), 0) / logs.length);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, () => initialState)
      .addCase(fetchLogs.fulfilled, (state, action) => {
        const logs = action.payload;
        if (!logs || logs.length < 5) return;

        const last5 = logs.slice(-5);
        state.averageMood = calcAverage(last5, (l) => l.mood.mood_scale);
        state.averageSleepTime = calcAverage(
          last5,
          (l) => l.sleep.sleep_time_scale,
        );

        if (logs.length >= 10) {
          const prev5 = logs.slice(-10, -5);
          state.previousAverageMood = calcAverage(
            prev5,
            (l) => l.mood.mood_scale,
          );
          state.previousAverageSleepTime = calcAverage(
            prev5,
            (l) => l.sleep.sleep_time_scale,
          );
        }
      });
  },
});

export default statisticsSlice.reducer;
