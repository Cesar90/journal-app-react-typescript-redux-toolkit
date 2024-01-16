import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { RootState } from "../store";
import { FirebaseDB } from "../../firebase/config";

export const startNewNote = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'journal/startNewNote',
    async (_, thunkAPI) => {
        try {
            const { uid } = (thunkAPI.getState() as RootState).auth

            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
            }

            const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
            const setDocResp = await setDoc(newDoc, newNote);
            console.log({ newDoc, setDocResp })

        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);