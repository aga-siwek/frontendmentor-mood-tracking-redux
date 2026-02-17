import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userName: string | null;
}

const initialState: AuthState = {
    // Sprawdzamy localStorage, żeby user nie musiał się logować po odświeżeniu
    token: localStorage.getItem('token'),
    userName: null,
};

export const authSlice = createSlice({
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
        }
    }
});

export const { setToken, setUserName, logout } = authSlice.actions;
export default authSlice.reducer;