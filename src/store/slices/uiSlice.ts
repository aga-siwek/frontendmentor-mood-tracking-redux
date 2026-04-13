import { createSlice } from "@reduxjs/toolkit";
import { logout } from "@/store/actions";
import { fetchChangeUserName } from "@/store/slices/authSlice";

export interface UIState {
  settingIsOpen: boolean;
  addNewLogIsOpen: boolean;
  settingMenuIsOpen: boolean;
  randomNumber: number;
}

const initialState: UIState = {
  settingIsOpen: false,
  addNewLogIsOpen: false,
  settingMenuIsOpen: false,
  randomNumber: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
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
    generateRandomNumber: (state) => {
      state.randomNumber = Math.floor(Math.random() * 11);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, () => initialState)
      .addCase(fetchChangeUserName.fulfilled, (state) => {
        state.settingIsOpen = false;
      });
  },
});

export const {
  openSetting,
  closeSetting,
  openLogAdded,
  closeLogAdded,
  clickSettingMenu,
  closeSettingMenu,
  generateRandomNumber,
} = uiSlice.actions;

export default uiSlice.reducer;
