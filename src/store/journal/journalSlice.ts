import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitalStateJournal = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, { payload }: PayloadAction<TNote>) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }: PayloadAction<TNote>) => {
            state.active = payload
        },
        setNotes: (state, action) => {

        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        }
    }
});

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions;