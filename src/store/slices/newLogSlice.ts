import { createSlice } from "@reduxjs/toolkit";
import { logout } from "@/store/actions";
import { fetchLogs } from "@/store/slices/logsSlice";

export interface NewLogState {
  todayMood?: number;
  todayFeels: string[];
  todayDescription?: string;
  todaySleepTime?: number;
  process: number;
}

const initialState: NewLogState = {
  todayMood: undefined,
  todayFeels: [],
  todayDescription: undefined,
  todaySleepTime: undefined,
  process: 1,
};

const newLogSlice = createSlice({
  name: "newLog",
  initialState,
  reducers: {
    addTodayLog: (state, action) => {
      if (!state.todayMood) {
        state.process = 2;
        state.todayMood = action.payload;
      } else if (state.todayFeels.length === 0) {
        state.process = 3;
        state.todayFeels = action.payload;
      } else if (!state.todayDescription) {
        state.process = 4;
        state.todayDescription = action.payload;
      } else if (!state.todaySleepTime) {
        state.process = 5;
        state.todaySleepTime = action.payload;
      } else {
        state.process = 1;
        state.todayMood = undefined;
        state.todayFeels = [];
        state.todayDescription = undefined;
        state.todaySleepTime = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, () => initialState)
      .addCase(fetchLogs.fulfilled, (state, action) => {
        const logs = action.payload;
        const lastLog = logs?.at(-1);
        if (!lastLog) return;

        const date = new Date();
        const isTodayLog =
          lastLog.created_at_day === date.getDate() &&
          lastLog.created_at_month === date.getMonth() + 1 &&
          lastLog.created_at_year === date.getFullYear();

        if (!isTodayLog) return;

        state.todayMood = lastLog.mood?.mood_scale;
        state.todayDescription = lastLog.description?.description;
        state.todaySleepTime = lastLog.sleep?.sleep_time_scale;
        state.todayFeels = [];
        lastLog.feels?.forEach((feel: { feel_name: string }) => {
          state.todayFeels.push(feel.feel_name);
        });
      });
  },
});

export const { addTodayLog } = newLogSlice.actions;
export default newLogSlice.reducer;
