import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkingCredentials, logout, login } from './';
import { signInWithGoogle } from '../../firebase/providers';

type TsignInWithGoogle = Awaited<ReturnType<typeof signInWithGoogle>>

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const checkingAuthentication = createAsyncThunk<{}, LoginByEmailProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData: LoginByEmailProps, thunkAPI) => {
        try {
            thunkAPI.dispatch(checkingCredentials())
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startGoogleSignIn = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'login/loginByUsername',
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
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
