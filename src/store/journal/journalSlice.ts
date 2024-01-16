import { createSlice } from "@reduxjs/toolkit";

const initialState: InitalStateJournal = {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        addNewEmptyNote: (state, action) => {

        },
        setActiveNote: (state, action) => {

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
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions;