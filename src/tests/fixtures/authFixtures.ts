import { InitalState } from "../../store/auth";

export const initialState: RequireOnly<InitalState, "status"> = {
    status: "checking",
    uid: undefined,
    email: undefined,
    displayName: undefined,
    photoURL: undefined,
    errorMessage: undefined,
};

export const initialStateAuthenticated: RequireOnly<InitalState, "status"> = {
    status: "authenticated",
    uid: "123ABC",
    email: "demo@google.com",
    displayName: "Demo User",
    photoURL: "https://demo.jpg",
    errorMessage: undefined,
};

export const initialStateNotAuthenticated: RequireOnly<InitalState, "status"> = {
    status: "not-authenticated",
    uid: undefined,
    email: undefined,
    displayName: undefined,
    photoURL: undefined,
    errorMessage: undefined,
};


export const demoUser: RequireOnly<InitalState, "uid" | "email" | "displayName" | "photoURL"> = {
    uid: "123ABC",
    email: "demo@google.com",
    displayName: "Demo User",
    photoURL: "https://demo.jpg",
};
