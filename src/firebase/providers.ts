import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

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