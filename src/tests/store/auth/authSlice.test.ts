import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { demoUser, initialState, initialStateAuthenticated } from "../../fixtures/authFixtures";

describe("Testing in the authSlice", () => {
    test("must of return inital state and call it 'auth'", () => {
        expect(authSlice.name).toBe("auth");
        const state = authSlice.reducer(initialState, { type: "" });
        expect(state).toEqual(initialState);
    });
    test("Must make authentication", () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: "authenticated",
            uid: state.uid,
            email: state.email,
            displayName: state.displayName,
            photoURL: state.photoURL,
            errorMessage: undefined,
        })
    });
    test("Must make logout without args", () => {
        const state = authSlice.reducer(initialStateAuthenticated, logout({}));
        expect(state).toEqual(
            {
                status: 'not-authenticated',
                uid: undefined,
                email: undefined,
                displayName: undefined,
                photoURL: undefined,
                errorMessage: undefined
            }
        )
    });
    test("Must make logout and show message", () => {
        const errorMessage = "Credential are not correct";
        const state = authSlice.reducer(initialStateAuthenticated, logout({ errorMessage }));
        expect(state).toEqual(
            {
                status: 'not-authenticated',
                uid: undefined,
                email: undefined,
                displayName: undefined,
                photoURL: undefined,
                errorMessage
            }
        )
    });

    test("Must change state to checking", () => {
        const state = authSlice.reducer(initialStateAuthenticated, checkingCredentials());
        expect(state.status).toBe('checking');

    });
});