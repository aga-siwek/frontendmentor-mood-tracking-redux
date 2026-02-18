import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    token: string | null;
    userName: string | null;
}

const initialState: UserState = {
    // Sprawdzamy localStorage, żeby user nie musiał się logować po odświeżeniu
    token: localStorage.getItem('token'),
    userName: null,
};

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // KROK 1: Tylko token po udanym logowaniu/rejestracji
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },

        // KROK 2: Ustawienie imienia (np. z osobnego formularza lub po pobraniu profilu)
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },

        logout: (state) => {
            state.token = null;
            state.userName = null;
            localStorage.removeItem('token');
        },
        register: (state, action) => {
        }
    }
});

export const { setToken, setUserName, logout } = userSlice.actions;
export default userSlice.reducer;