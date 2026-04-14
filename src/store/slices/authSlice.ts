import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { type AxiosError } from "axios";
import { logout } from "@/store/actions";
import { fetchLogs } from "@/store/slices/logsSlice";
import { APP_STATE, API_URL } from "@/store/constants";

interface UserData {
  user_email: string;
  user_password: string;
}

export interface AuthState {
  appState: string;
  userName?: string;
  userEmail?: string;
  userID?: string;
  loginLoading: boolean;
  loginError: string | null;
  loginToken: string | null;
  registerLoading: boolean;
  registerError: string | null;
  changeUserNameLoading: boolean;
  changeUserNameError: string | null;
}

const initialState: AuthState = {
  appState: APP_STATE.LOGOUT,
  userName: undefined,
  userEmail: undefined,
  userID: undefined,
  loginLoading: false,
  loginError: null,
  loginToken: null,
  registerLoading: false,
  registerError: null,
  changeUserNameLoading: false,
  changeUserNameError: null,
};

const resolveAppState = (state: AuthState, logs: any[]) => {
  if (
    state.appState === APP_STATE.LOGOUT ||
    state.appState === APP_STATE.REGISTER
  )
    return;

  if (!state.userName) {
    state.appState = APP_STATE.USER_NAME_NOT_ADDED;
    return;
  }

  const date = new Date();
  const lastLog = logs?.at(-1);
  if (!lastLog) {
    state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
    return;
  }

  if (
    lastLog.created_at_day === date.getDate() &&
    lastLog.created_at_month === date.getMonth() + 1 &&
    lastLog.created_at_year === date.getFullYear()
  ) {
    state.appState = APP_STATE.TODAY_LOG_ADDED;
  } else {
    state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
  }
};

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (loginData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, loginData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || "Log Error");
    }
  },
);

export const fetchRegister = createAsyncThunk(
  "auth/register",
  async (registerData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register/`, registerData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || "Register Error");
    }
  },
);

export const fetchChangeUserName = createAsyncThunk(
  "auth/changeUserName",
  async (newUserName: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/users/me`,
        { user_name: newUserName },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || "User put Error");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    goToRegister: (state) => {
      state.appState = APP_STATE.REGISTER;
    },
    goToLogin: (state) => {
      state.appState = APP_STATE.LOGOUT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.appState = APP_STATE.LOGOUT;
        state.userName = undefined;
        state.userEmail = undefined;
        state.userID = undefined;
        state.loginToken = null;
        localStorage.clear();
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginToken = action.payload.access_token;
        state.userName = action.payload.user_name;
        state.userEmail = action.payload.user_email;
        localStorage.setItem("token", action.payload.access_token);
        // Set initial appState — will be refined after fetchLogs.fulfilled
        state.appState = state.userName
          ? APP_STATE.TODAY_LOG_NOT_ADDED
          : APP_STATE.USER_NAME_NOT_ADDED;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload as string;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.registerLoading = false;
        state.appState = APP_STATE.LOGOUT;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload as string;
      })
      .addCase(fetchChangeUserName.pending, (state) => {
        state.changeUserNameLoading = true;
        state.changeUserNameError = null;
      })
      .addCase(fetchChangeUserName.fulfilled, (state, action) => {
        state.changeUserNameLoading = false;
        state.userName = action.payload[0].user_name;
        if (state.appState === APP_STATE.USER_NAME_NOT_ADDED) {
          state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
        }
      })
      .addCase(fetchChangeUserName.rejected, (state, action) => {
        state.changeUserNameLoading = false;
        state.changeUserNameError = action.payload as string;
      })
      // Resolves appState after logs are loaded (payload = logsData)
      .addCase(fetchLogs.fulfilled, (state, action) => {
        resolveAppState(state, action.payload);
      });
  },
});

export const { goToRegister, goToLogin } = authSlice.actions;
export default authSlice.reducer;
