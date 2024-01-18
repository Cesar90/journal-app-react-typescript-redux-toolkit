import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    checkingCredentials,
    logout,
    login
} from './';
import {
    signInWithGoogle,
    registerWithEmailPassword,
    RegisterGoogle,
    loginWithEmailPassword,
    logoutFirebase
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';

type TsignInWithGoogle = Awaited<ReturnType<typeof signInWithGoogle>>

export interface LoginByEmailProps {
    email: string;
    password: string;
}

export const checkingAuthentication = createAsyncThunk<{}, LoginByEmailProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData: LoginByEmailProps, thunkAPI) => {
        try {
            console.log(authData)
            thunkAPI.dispatch(checkingCredentials())
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startGoogleSignIn = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'login/startGoogleSignIn',
    async ({ }, thunkAPI) => {
        try {
            thunkAPI.dispatch(checkingCredentials())
            const result: TsignInWithGoogle = await signInWithGoogle()
            if (typeof result.errorMessage == "string" && result.errorMessage != undefined) {
                return thunkAPI.dispatch(logout({ errorMessage: result.errorMessage }))
            }
            let loginData = {
                displayName: result.displayName?.toString(),
                email: result.email?.toString(),
                photoURL: result.photoURL?.toString(),
                uid: result.uid?.toString(),
                errorMessage: undefined,
            }
            return thunkAPI.dispatch(login(loginData))
        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startCreatingUserWithEmailPassword = createAsyncThunk<{}, RegisterGoogle, { rejectValue: string }>(
    'login/startCreatingUserWithEmailPassword',
    async (registerData: RegisterGoogle, thunkAPI) => {
        try {
            thunkAPI.dispatch(checkingCredentials())
            const result = await registerWithEmailPassword(registerData)
            if (typeof result.errorMessage == "string" && result.errorMessage != undefined) {
                return thunkAPI.dispatch(logout({ errorMessage: result.errorMessage }))
            }

            let loginData = {
                displayName: result.displayName?.toString(),
                email: result.email?.toString(),
                photoURL: result.photoURL?.toString(),
                uid: result.uid?.toString(),
                errorMessage: undefined,
            }
            return thunkAPI.dispatch(login(loginData))
        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startLoginWithEmailPassword = createAsyncThunk<{}, LoginByEmailProps, { rejectValue: string }>(
    'login/startLoginWithEmailPassword',
    async (authData: LoginByEmailProps, thunkAPI) => {
        try {
            console.log(authData)
            const result = await loginWithEmailPassword(authData);
            if (typeof result.errorMessage == "string" && result.errorMessage != undefined) {
                return thunkAPI.dispatch(logout({ errorMessage: result.errorMessage }))
            }
            let loginData = {
                displayName: result.displayName?.toString(),
                email: authData.email,
                photoURL: result.photoURL?.toString(),
                uid: result.uid?.toString(),
                errorMessage: undefined,
            }
            return thunkAPI.dispatch(login(loginData))

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);


export const startLogout = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'login/startLogout',
    async (_, thunkAPI) => {
        try {
            await logoutFirebase();
            thunkAPI.dispatch(logout({}))
            thunkAPI.dispatch(clearNotesLogout())
        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);