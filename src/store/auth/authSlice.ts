import { createSlice } from "@reduxjs/toolkit";

export type InitalState = {
  status: (typeof USER_STATUS)[number];
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
};

const initialState: PartialWithRequired<InitalState, "status"> = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
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
