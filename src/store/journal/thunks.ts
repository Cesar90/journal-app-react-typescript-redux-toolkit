import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { RootState } from "../store";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice";

export const startNewNote = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'journal/startNewNote',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(savingNewNote())
            const { uid } = (thunkAPI.getState() as RootState).auth

            const newNote = {
                id: '',
                title: '',
                body: '',
                date: new Date().getTime(),
                imagesUrls: []
            }

            const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
            await setDoc(newDoc, newNote);
            newNote.id = newDoc.id;
            thunkAPI.dispatch(addNewEmptyNote(newNote))
            thunkAPI.dispatch(setActiveNote(newNote))


        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);