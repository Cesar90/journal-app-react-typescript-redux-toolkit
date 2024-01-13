import { createSlice } from "@reduxjs/toolkit";

export type InitalState = {
  status: (typeof USER_STATUS)[number];
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
};

const initialState: PartialWithRequired<InitalState, "status"> = {
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
    login: (state) => { },
    logout: (state) => { },
    checkingCredentials: (state) => {
      state.status = "checking"
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
