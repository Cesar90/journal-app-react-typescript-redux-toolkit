import { authSlice } from "../../../store/auth/authSlice"
import { initialState } from "../../fixtures/authFixtures";

describe("Testing in the authSlice", () => {
    test("must of return inital state and call it 'auth'", () => {
        expect(authSlice.name).toBe("auth");
        const state = authSlice.reducer(initialState, { type: "" });
        expect(state).toEqual(initialState);
    });
});