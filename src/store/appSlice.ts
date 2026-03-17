import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
  createAsyncThunk,
} from "@reduxjs/toolkit";
const API_URL = "http://192.168.100.53:5001";
import axios, { isAxiosError } from "axios";
import {retry} from "@reduxjs/toolkit/query";

export const APP_STATE = {
  LOGOUT: "logout",
  REGISTER: "register",
  USER_NAME_NOT_ADDED: "userNameNoNotAdded",
  TODAY_LOG_ADDED: "today_log_added",
  TODAY_LOG_NOT_ADDED: "today_log_not_added",
};

export const MOOD = {
  VERY_HAPPY: 2,
  HAPPY: 1,
  NEUTRAL: 0,
  SAD: -1,
  VERY_SAD: -2,
};

export const SLEEP_TIME = {
  HOURS_MORE_9: 4,
  HOURS_7_8: 3,
  HOURS_5_6: 2,
  HOURS_3_5: 1,
  HOURS_0_2: 0,
};
export const FEELS_LIST = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
];

export interface AppState {
  appState: string;
  userName?: string;
  userEmail?: string;
  userID?: string;
  todayMood?: number;
  todayFeels: string[];
  todayDescription?: string;
  todaySleepTime?: number;
  averageMood?: number;
  previousAverageMood?: number;
  averageSleepTime?: number;
  previousAverageSleepTime?: number;
  todayLogAdded: boolean;
  settingIsOpen: boolean;
  addNewLogIsOpen: boolean;
  settingMenuIsOpen: boolean;
  process: number;
  testData: [];
  logsData: any;
  logsLoading: boolean;
  logsError: string | null;
  loginLoading: boolean;
  loginError: string | null;
  loginToken: string | null;
  newLogLoading: boolean;
  newLogError: string | null;
  changeUserNameLoading: boolean;
  changeUserNameError: string | null;
}

const initialState: AppState = {
  appState: APP_STATE.LOGOUT,
  userName: undefined,
  userEmail: undefined,
  userID: undefined,
  todayMood: undefined,
  todayFeels: [],
  todayDescription: undefined,
  todaySleepTime: undefined,
  averageMood: undefined,
  previousAverageMood: undefined,
  averageSleepTime: undefined,
  previousAverageSleepTime: undefined,
  todayLogAdded: false,
  settingIsOpen: false,
  addNewLogIsOpen: false,
  settingMenuIsOpen: false,
  process: 1,
  testData: [],
  logsData: null,
  logsLoading: false,
  logsError: null,
  changeUserNameLoading: false,
  changeUserNameError: null
};

interface Log {
  id: number;
  title: string;
}

export const fetchLogs = createAsyncThunk(
  "logs/users/me",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/logs/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "fetch data answer");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Auth error");
    }
  },
);

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (loginData: AppState, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, loginData);

      console.log("Success login", response.data);
      return response.data;

    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Log Error");
    }
  },
);

export const fetchChangeUserName = createAsyncThunk(
    "auth/users/me",
    async (newUserName: AppState, { getState, rejectWithValue }) => {
      try {
        console.log("start fetchChangeUserName");
        const state = getState() as { app: AppState };
        const appState = state.app;
        console.log(appState.userName, "user name changeUserName")

        const newUserData = {
          user_name: newUserName,
        };

        const token = localStorage.getItem("token");
        appState.settingIsOpen = false;

        const response = await axios.put(`${API_URL}/users/me`, newUserData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Sukcess! Change data in user name.", response.data);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || "User put Error");
      }
    },
);

export const fetchNewLog = createAsyncThunk(
  "auth/fetchNewLog",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { app: AppState };
      const appState = state.app;

      const newLogData = {
        feel: appState.todayFeels,
        mood_scale: Number(appState.todayMood),
        sleep_time_scale: Number(appState.todaySleepTime),
        description: appState.todayDescription,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(`${API_URL}/logs/`, newLogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Sukcess! Log in data base.", response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "new log error");
    }
  },
);

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    changeStateAfterLogin: (state) => {
      console.log("change state after login start", state.appState);
      if (state.appState === APP_STATE.LOGOUT) {
        console.log("state logout");
        return
      }
      if (state.appState === APP_STATE.REGISTER) {
        console.log("state register");
        return
      }
      const date = new Date();
        console.log("change state after login  token is not null", state.userName)
        if (!state.userName && state.appState) {
          state.appState = APP_STATE.USER_NAME_NOT_ADDED;
          state.settingIsOpen = true
        }

        else {
          const lastLog = state.logsData?.at(-1);
          console.log("changeStateAfterLogin last log", lastLog);
          if (lastLog) {
            console.log("lastLog.created_at_day", lastLog.created_at_day === date.getDate())
            console.log("lastLog.created_at_month", lastLog.created_at_month, date.getMonth())
            console.log("lastLog.created_at_year ", lastLog.created_at_year === date.getFullYear())
            if (
                lastLog.created_at_day === date.getDate() &&
                lastLog.created_at_month === date.getMonth()+1 &&
                lastLog.created_at_year === date.getFullYear()
            ) {
              console.log("today log added")
              state.appState = APP_STATE.TODAY_LOG_ADDED;
              return
            }
            else {
              console.log("today log not added")
              state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
              return;
            }
          }
          else {
            state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
            return;
          }
        }
      console.log("change state after login start end", state.appState);

    },
    login: (state, action) => {
      const [email, password] = action.payload;
    },
    register: (state, action) => {},
    logout: (state) => {
      state.appState = APP_STATE.LOGOUT;
      state.logsData = null;
      localStorage.clear();
      state.averageMood = undefined;
      state.previousAverageMood = undefined;
      state.averageSleepTime = undefined;
      state.previousAverageSleepTime = undefined;
      state.settingIsOpen = false;
      state.userName = undefined;
      state.userEmail = undefined;
    },

    hasUserName: () => {},
    changeUserName: () => {},
    downloadLog: () => {
      console.log("downloadLog");
    },

    isTodayMoodLogged: () => {},
    addTodayLog: (state, action) => {

      if (!state.todayMood) {
        state.process = 2
        state.todayMood = action.payload;
      }
      else if (state.todayFeels.length === 0)
      {state.process = 3
        state.todayFeels=action.payload;}

      else if (!state.todayDescription) {
        state.process = 4
        state.todayDescription = action.payload
      }
      else if (!state.todaySleepTime) {
        state.process = 5
        state.todaySleepTime = action.payload;
      }
      else {
        state.process = 5
        state.addNewLogIsOpen = false
        state.process = 1;
        state.todayMood = undefined;
        state.todayFeels = []
        state.todayDescription = undefined;
        state.todaySleepTime = undefined;
      }
    },

    deleteTodayLog: () => {},

    showAverageMood: (state) => {
      const logs = state.logsData;
      if (logs.length >= 5) {
        let tempSumAverageMood: number = 0;
        const last5logs = logs.slice(-5);
        last5logs.map((log) => {
          tempSumAverageMood += log.mood.mood_scale;
        });
        state.averageMood = Math.round(tempSumAverageMood / 5);
        console.log(state.averageMood, "sliceapi averageMood", state.averageMood);
      }
    },
    showPreviousAverageMood: (state) => {
      const logs = state.logsData;
      if (logs.length >= 10) {
        let tempSumPrevAverageMood: number = 0;
        const lastPrev5logs = logs.slice(-10, -5);
        lastPrev5logs.map((log) => {
          tempSumPrevAverageMood += log.mood.mood_scale;
        });
        state.previousAverageMood = Math.round(tempSumPrevAverageMood / 5);
        console.log(state.previousAverageMood, "sliceapi previousAverageMood");
      }
    },
    showAverageSleepTime: (state) => {
      const logs = state.logsData;
      if (logs.length >= 5) {
        let tempSumSleepTime: number = 0;
        const last5logs = logs.slice(-5);
        last5logs.map((log) => {
          tempSumSleepTime += log.sleep.sleep_time_scale;
        });
        state.averageSleepTime = Math.round(tempSumSleepTime / 5);
        console.log(state.averageSleepTime, "sliceapi averageSleepTime");
      }
    },
    showPreviousAverageSleepTime: (state) => {
      const logs = state.logsData;
      console.log(state.logsData, "sliceapi PreviousAverageSleepTime data");
      if (logs.length >= 10) {
        let tempSumPrevSleepTime: number = 0;
        const lastPrev5logs = logs.slice(-10, -5);
        lastPrev5logs.map((log) => {
          tempSumPrevSleepTime += log.sleep.sleep_time_scale;
        });
        state.previousAverageSleepTime = Math.round(tempSumPrevSleepTime / 5);
        console.log(state.previousAverageSleepTime, "sliceapi previousAverageSleepTime");
      }
    },
    showTodayLogs: (state) => {
      state.todayFeels = []
      state.todayMood = state.logsData?.at(-1)?.mood?.mood_scale;
      state.todayDescription = state.logsData?.at(-1)?.description?.description
      state.todaySleepTime = state.logsData?.at(-1)?.sleep.sleep_time_scale;
      state.logsData?.at(-1).feels.map((feel)=> {state.todayFeels.push(feel.feel_name)})
      console.log(state.todayFeels, "today feels form appslice");
    },

    openSetting: (state) => {
      state.settingIsOpen = true;
      state.settingMenuIsOpen = false;
    },
    closeSetting: (state) => {
      state.settingIsOpen = false;
    },
    openLogAdded: (state) => {
      state.addNewLogIsOpen = true;
    },
    closeLogAdded: (state) => {
      state.addNewLogIsOpen = false;
    },
    clickSettingMenu: (state) => {
      state.settingMenuIsOpen = !state.settingMenuIsOpen;
    },
    closeSettingMenu: (state) => {
      state.settingMenuIsOpen = false;
    },
    goToRegister: (state) => {
      state.appState = APP_STATE.REGISTER;
    },
    goToLogin: (state) => {
      state.appState = APP_STATE.LOGOUT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.logsLoading = true;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logsLoading = false;
        state.logsData = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.logsLoading = false;
        state.logsError = action.payload as string;
      })

      .addCase(fetchLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          state.loginLoading = false;
          state.loginToken = action.payload.access_token;
          state.userName = action.payload.user_name
          state.userEmail = action.payload.user_email

          localStorage.setItem("token", action.payload.access_token);
          console.log("change state after login start", state.appState);

          const todayDate = new Date();
          console.log("change state after login token is not null")

          if (!state.userName) {
            state.appState = APP_STATE.USER_NAME_NOT_ADDED;
          }
          else {
            const lastLog = state.logsData?.at(-1);
            if (lastLog) {
              if (
                  lastLog.created_at_day === todayDate.getDate() &&
                  lastLog.created_at_month === todayDate.getMonth() &&
                  lastLog.created_at_year === todayDate.getFullYear()
              ) {
                state.appState = APP_STATE.TODAY_LOG_ADDED;
              }
              else {
                state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
              }
            }
            else {
              state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
            }
          }

          console.log("change state after login end", state.appState);
          console.log("change state after token", localStorage.getItem("token"));

          const date = new Date();
          if (localStorage.getItem("token") != null) {
            console.log("change state after login  token is not null")
            if (!state.userName) {
              state.appState = APP_STATE.USER_NAME_NOT_ADDED;
            }
            else {
              const lastLogRepeat = state.logsData?.at(-1);
              if (lastLogRepeat) {
                if (
                    lastLogRepeat.created_at_day === date.getDate() &&
                    lastLogRepeat.created_at_month === date.getMonth() &&
                    lastLogRepeat.created_at_year === date.getFullYear()
                ) {
                  state.appState = APP_STATE.TODAY_LOG_ADDED;
                }
                else {
                  state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
                }
              }
              else {
                state.appState = APP_STATE.TODAY_LOG_NOT_ADDED;
              }
            }
            console.log("change state after login end", state.appState);
          }
          console.log("change state after login token is null", localStorage.getItem("token"));
        })      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload as string;
      })

      .addCase(fetchNewLog.pending, (state) => {
        state.newLogLoading = true;
        state.newLogError = null;
      })
      .addCase(fetchNewLog.fulfilled, (state, action) => {
        state.newLogLoading = false;
      })
      .addCase(fetchNewLog.rejected, (state, action) => {
        state.newLogLoading = false;
        state.newLogError = action.payload as string;
      })

  .addCase(fetchChangeUserName.pending, (state) => {
    console.log("fetchChangeUserName.pending,")
      state.changeUserNameLoading = true;
      state.changeUserNameError = null;
    })
        .addCase(fetchChangeUserName.fulfilled, (state, action) => {
          console.log("fetchChangeUserName.fulfilled")
          state.changeUserNameLoading = false;
          state.userName = action.payload.user_name
        })
        .addCase(fetchChangeUserName.rejected, (state, action) => {
          console.log("fetchChangeUserName.rejected")
          state.changeUserNameLoading = false;
          state.changeUserNameError = action.payload as string;
        });
  },
});
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(fetchNewLog.fulfilled, appSlice.actions.login, fetchLogin.fulfilled),
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(fetchLogs());
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(fetchNewLog.fulfilled, appSlice.actions.login, fetchLogin.fulfilled, fetchLogs.fulfilled),
  effect: async (action, listenerApi) => {

    listenerApi.dispatch(showAverageMood());
    listenerApi.dispatch(showAverageSleepTime());
    listenerApi.dispatch(showPreviousAverageMood());
    listenerApi.dispatch(showPreviousAverageSleepTime());
    listenerApi.dispatch(changeStateAfterLogin())
    listenerApi.dispatch(showTodayLogs())
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(appSlice.actions.login, fetchLogin.fulfilled),
  effect: async (state, action, listenerApi) => {
    console.log(state.userName, "listener");
    if (state.userName === null) {
      console.log("userName is null");
      listenerApi.dispatch(openSetting());
    }
  },
});



export const {
  login,
  register,
  downloadLog,
  addTodayLog,
  deleteTodayLog,
  changeUserName,
  isTodayMoodLogged,
  hasUserName,
  logout,
  openSetting,
  closeSetting,
  openLogAdded,
  closeLogAdded,
  clickSettingMenu,
  closeSettingMenu,
  changeStateAfterLogin,
  goToRegister,
  goToLogin,
  showAverageMood,
  showPreviousAverageMood,
  showAverageSleepTime,
  showPreviousAverageSleepTime,
  showTodayLogs
} = appSlice.actions;

export default appSlice.reducer;
