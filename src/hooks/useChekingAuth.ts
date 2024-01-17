import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useChekingAuth = () => {
    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            console.log(user)
            if (!user) return dispatch(logout({}))
            const { uid, email, displayName, photoURL } = user
            const userInfo = {
                uid,
                email: email?.toString(),
                displayName: displayName?.toString(),
                photoURL: photoURL?.toString()
            }
            dispatch(login(userInfo))
            dispatch(startLoadingNotes({}))
        })
    }, []);

    return {
        status
    }
}
