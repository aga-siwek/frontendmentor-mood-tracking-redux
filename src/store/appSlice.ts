import { createListenerMiddleware, createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import testData from "@/test_data.json"
const API_URL = "http://127.0.0.1:5000"
import axios, {isAxiosError} from "axios";

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
}

export const SLEEP_TIME = {
  HOURS_MORE_9: 4,
  HOURS_7_8: 3,
  HOURS_5_6: 2,
  HOURS_3_5: 1,
  HOURS_0_2: 0,
}
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
  "Restless"
]


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
  todayLogAdded: boolean,
  settingIsOpen: boolean,
  addNewLogIsOpen: boolean,
  settingMenuIsOpen: boolean,
  process: number,
  testData: [],
  logsData: any;
  logsLoading: boolean;
  logsError: string | null
  loginLoading: boolean;
  loginError: string | null
  loginToken: string | null
  newLogLoading: boolean;
  newLogError: string | null
}

const initialState: AppState = {
  appState: APP_STATE.TODAY_LOG_ADDED,
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
  newLoading: false,
  logsError: null,
};

interface Log {
  id: number;
  title: string;
}

export const fetchLogs = createAsyncThunk(
    'logs/users/me',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_URL}/logs/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || 'Auth error');
      }
    }
);

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async (loginData: AppState, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/login/`, loginData);

        console.log("Success", response.data);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || 'Log Error');
      }
    }
);

export const fetchNewLog = createAsyncThunk(
    'auth/fetchNewLog',
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState() as { app: AppState };
        const appState = state.app;

        const newLogData = {
          feel: appState.todayFeels,
          mood_scale: Number(appState.todayMood),
          sleep_time_scale: Number(appState.todaySleepTime),
          description: appState.todayDescription
        };

        const token =  localStorage.getItem('token');

        const response = await axios.post(`${API_URL}/logs/`, newLogData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Sukcess! Log in data base.", response.data);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || 'new log error');
      }
    }
);


export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    login: (state, action) => {
      const [email, password] = action.payload;
    },
    register: (state, action) => {},
    logout: (state) => {
      state.appState = APP_STATE.LOGOUT;
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
        const todayDate = new Date();
        state.addNewLogIsOpen = false

        const todayNewLog = {
          "created_at": todayDate.getDate(),
          "created_at_day": todayDate.getDay(),
          "created_at_hour": todayDate.getHours(),
          "created_at_minute": todayDate.getMinutes(),
          "created_at_month": todayDate.getSeconds(),
          "created_at_year": todayDate.getFullYear(),
          "description": {
            "description": state.todayDescription,
            "description_id": 1,
            "log_id": 1
          },
          "feels": [
            {
              "feel_id": 1,
              "feel_name": "Calm",
              "log_id": 1
            },
            {
              "feel_id": 2,
              "feel_name": "Frustrated",
              "log_id": 1
            }
          ],
          "log_id": 1,
          "mood": {
            "log_id": 1,
            "mood_id": 1,
            "mood_name": "Happy",
            "mood_scale": Number(state.todayMood)
          },
          "sleep": {
            "log_id": 1,
            "sleep_id": Number(state.todaySleepTime),
            "sleep_time_name": "5-6 hours",
            "sleep_time_scale": 2
          },
          "user_id": 1
        }
        testData.push(todayNewLog);
        state.process = 1;
        state.todayMood = undefined;
        state.todayFeels = []
        state.todayDescription = undefined;
        state.todaySleepTime = undefined;
      }
    },
    deleteTodayLog: () => {},

    showAverageMood: (state) => {
      const logs = state.logsData
      console.log(logs)
      if (logs.length >= 5) {
        let tempSumAverageMood:number = 0
        const last5logs = logs.slice(-5)
        last5logs.map((log) => {
          tempSumAverageMood += log.mood.mood_scale
        })
        state.averageMood = Math.round(tempSumAverageMood/5)
      }
    },
    showPreviousAverageMood: (state) => {
      const logs = state.logsData
      if (logs.length >= 10) {
        let tempSumPrevAverageMood:number = 0
        const lastPrev5logs = logs.slice(-10, -5)
        lastPrev5logs.map((log) => {
          tempSumPrevAverageMood += log.mood.mood_scale
        })
        state.previousAverageMood= Math.round(tempSumPrevAverageMood/5)
      }
    },
    showAverageSleepTime: (state) => {
      const logs = state.logsData
      if (logs.length >= 5) {
        let tempSumSleepTime:number = 0
        const last5logs = logs.slice(-5)
        last5logs.map((log) => {
          tempSumSleepTime += log.sleep.sleep_time_scale
        })
        state.averageSleepTime = Math.round(tempSumSleepTime/5)
      }
    },
    showPreviousAverageSleepTime: (state) => {
      const logs = state.logsData
      if (logs.length >= 10) {
        let tempSumPrevSleepTime:number = 0
        const lastPrev5logs = logs.slice(-10, -5)
        lastPrev5logs.map((log) => {
          tempSumPrevSleepTime += log.sleep.sleep_time_scale
        })
        state.previousAverageSleepTime= Math.round(tempSumPrevSleepTime/5)
      }
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
      state.settingMenuIsOpen = (!state.settingMenuIsOpen);
    },
    closeSettingMenu: (state) => {
      state.settingMenuIsOpen = false;
    },
    goToRegister: (state) => {
      state.appState = APP_STATE.REGISTER;
    },
    goToLogin: (state) => {
      state.appState = APP_STATE.LOGOUT;
    }
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
          state.userEmail = action.payload.user_name; // lub e-mail

          localStorage.setItem('token', action.payload.access_token);
        })
        .addCase(fetchLogin.rejected, (state, action) => {
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
        });
  },
});
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(fetchNewLog.fulfilled, appSlice.actions.login,),
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(fetchLogs());

    listenerApi.dispatch(showAverageMood());
    listenerApi.dispatch(showAverageSleepTime());
    listenerApi.dispatch(showPreviousAverageMood())
    listenerApi.dispatch(showPreviousAverageSleepTime())
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
    goToRegister,
    goToLogin,
  showAverageMood,
  showPreviousAverageMood,
  showAverageSleepTime,
  showPreviousAverageSleepTime
} = appSlice.actions;

export default appSlice.reducer;
