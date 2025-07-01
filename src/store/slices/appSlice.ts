import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { colorScheme } from "nativewind";

export type Theme = 'light' | 'dark';

export interface Insets {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface AppState {
  theme: Theme;
  insets: Insets;
  isFirstLaunch: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  theme: 'dark',
  insets: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  isFirstLaunch: true,
  isLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setInsets: (state, action: PayloadAction<Insets>) => {
      state.insets = action.payload;
    },
    setIsFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      colorScheme.set(newTheme);
      state.theme = newTheme;
    },
  },
});

export const { setTheme, setInsets, setIsFirstLaunch, setIsLoading, toggleTheme } = appSlice.actions;
export default appSlice.reducer;
