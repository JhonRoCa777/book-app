import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { Auth } from "../models/Auth";
import { AuthSlice } from "./Auth";

interface AppStore {
  AuthSlice: Auth,
}

export const Store = configureStore<AppStore>({
  reducer: {
    AuthSlice: AuthSlice.reducer,
  }
});

export const AuthStore = () => useSelector((store: AppStore) => store.AuthSlice);