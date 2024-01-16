import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type InitalState = {
  status: (typeof USER_STATUS)[number];
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
};

const initialState: RequireOnly<InitalState, "status"> = {
  status: "checking",
  uid: undefined,
  email: undefined,
  displayName: undefined,
  photoURL: undefined,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: "auth",
  //declaracion del estado inicial de las variables
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<Partial<Omit<InitalState, "status">>>) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
      state.displayName = payload.displayName;
      state.errorMessage = payload.errorMessage;
    },
    logout: (state, { payload }: PayloadAction<RequireOnly<InitalState, "errorMessage">>) => {
      state.status = "not-authenticated";
      state.uid = undefined;
      state.email = undefined;
      state.photoURL = undefined;
      state.displayName = undefined;
      state.errorMessage = payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking"
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
