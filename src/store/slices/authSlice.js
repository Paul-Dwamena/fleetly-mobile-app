import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const payload = action.payload;
      state.token = payload.token;
      state.user = payload.user ?? null;
      state.isAuthenticated = Boolean(payload.token);
    },
    restoreAuth: (state, action) => {
      const payload = action.payload;
      state.token = payload.token;
      state.user = payload.user ?? null;
      state.isAuthenticated = Boolean(payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, restoreAuth, logout } = authSlice.actions;
export default authSlice.reducer;
