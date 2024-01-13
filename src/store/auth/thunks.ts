import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkingCredentials } from './';
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

export const startGoogleSignIn = createAsyncThunk<{}, LoginByEmailProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData: LoginByEmailProps, thunkAPI) => {
        try {
            thunkAPI.dispatch(checkingCredentials())
            const result: TsignInWithGoogle = await signInWithGoogle()
            console.log(result)
            if (result.errorMessage) {

            }
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
