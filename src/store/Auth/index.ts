import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthIS, type Auth } from "../../models/Auth";

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: AuthIS,
  reducers: {
    setAuthStore: ({}, action: PayloadAction<Auth>) => action.payload,
    resetAuthStore: () => AuthIS
  }
});

export const {
  setAuthStore,
  resetAuthStore
} = AuthSlice.actions;
