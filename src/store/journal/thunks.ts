import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { RootState } from "../store";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

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

export const startLoadingNotes = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'journal/startLoadingNotes',
    async (_, thunkAPI) => {
        try {

            const { uid } = (thunkAPI.getState() as RootState).auth
            if (!uid) throw new Error("The ID of user no exists")
            const notes = await loadNotes(uid);
            thunkAPI.dispatch(setNotes(notes))

        } catch (error) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startSaveNote = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'journal/startSaveNote',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setSaving())
            const { uid } = (thunkAPI.getState() as RootState).auth;
            const { active: note } = (thunkAPI.getState() as RootState).journal;
            const noteToFireStore = { ...note };
            delete noteToFireStore.id;
            if (note && note.id) {
                const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
                noteToFireStore.imagesUrls = noteToFireStore.imagesUrls ? noteToFireStore.imagesUrls : []
                await setDoc(docRef, noteToFireStore, { merge: true });
                thunkAPI.dispatch(updateNote(note));
            }
        } catch (error) {
            console.log("error", error)
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startUploadingFiles = createAsyncThunk<{}, { files: FileList }, { rejectValue: string }>(
    'journal/startUploadingFiles',
    async ({ files }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setSaving())
            const fileUploadPromises = [];
            for (const file of files) {
                fileUploadPromises.push(fileUpload(file))
            }

            const photosUrls = await Promise.all(fileUploadPromises);
            thunkAPI.dispatch(setPhotosToActiveNote(photosUrls))

        } catch (error) {
            console.log("error", error)
            return thunkAPI.rejectWithValue('error');
        }
    },
);

export const startDeletingNote = createAsyncThunk<{}, {}, { rejectValue: string }>(
    'journal/startDeletingNote',
    async (_, thunkAPI) => {
        try {
            const { uid } = (thunkAPI.getState() as RootState).auth;
            const { active: note } = (thunkAPI.getState() as RootState).journal;
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`);
            await deleteDoc(docRef);
            thunkAPI.dispatch(deleteNoteById({ id: note?.id ? note.id : "" }))

        } catch (error) {
            console.log("error", error)
            return thunkAPI.rejectWithValue('error');
        }
    },
);