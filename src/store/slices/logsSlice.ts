import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { type AxiosError } from "axios";
import { logout } from "@/store/actions";
import type { AppState } from "@/store/store";

const API_URL = "http://192.168.100.52:5003";

export interface Feel {
  feel_name: string;
}

export interface Log {
  created_at: string;
  created_at_day: number;
  created_at_month: number;
  created_at_year: number;
  mood: { mood_scale: number };
  sleep: { sleep_time_scale: number };
  feels: Feel[];
  description: { description: string };
}

export interface LogsState {
  logsData: Log[] | null;
  logsLoading: boolean;
  logsError: string | null;
  newLogLoading: boolean;
  newLogError: string | null;
}

const initialState: LogsState = {
  logsData: null,
  logsLoading: false,
  logsError: null,
  newLogLoading: false,
  newLogError: null,
};

export const fetchLogs = createAsyncThunk(
  "logs/users/me",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/logs/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || "Auth error");
    }
  },
);

export const fetchNewLog = createAsyncThunk(
  "logs/fetchNewLog",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as AppState;
      const { todayFeels, todayMood, todaySleepTime, todayDescription } =
        state.newLog;

      const newLogData = {
        feel: todayFeels,
        mood_scale: Number(todayMood),
        sleep_time_scale: Number(todaySleepTime),
        description: todayDescription,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/logs/`, newLogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || "new log error");
    }
  },
);

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.logsData = null;
      })
      .addCase(fetchLogs.pending, (state) => {
        state.logsLoading = true;
        state.logsError = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logsLoading = false;
        state.logsData = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.logsLoading = false;
        state.logsError = action.payload as string;
      })
      .addCase(fetchNewLog.pending, (state) => {
        state.newLogLoading = true;
        state.newLogError = null;
      })
      .addCase(fetchNewLog.fulfilled, (state) => {
        state.newLogLoading = false;
      })
      .addCase(fetchNewLog.rejected, (state, action) => {
        state.newLogLoading = false;
        state.newLogError = action.payload as string;
      });
  },
});

export default logsSlice.reducer;
