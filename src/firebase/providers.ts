import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { InitalState } from "../store/auth";

export type RegisterGoogle = Pick<InitalState, "email" | "displayName"> & { password: string }

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credentials)
        const { displayName, email, photoURL, uid } = result.user
        return {
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        let errorMessage = "";
        if (typeof error === 'object' && error !== null && "message" in error) {
            errorMessage = error.message as string
        }

        return {
            errorMessage
        }
    }
}

export const registerWithEmailPassword = async ({ email, password, displayName }: RegisterGoogle) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user
        if (FirebaseAuth.currentUser) {
            await updateProfile(FirebaseAuth.currentUser, {
                displayName
            })
        }

        return {
            displayName,
            email,
            photoURL: photoURL?.toString(),
            uid: uid.toString()
        }

    } catch (error) {
        let errorMessage = "";
        if (typeof error === 'object' && error !== null && "message" in error) {
            errorMessage = error.message as string
        }

        return {
            errorMessage
        }
    }
}