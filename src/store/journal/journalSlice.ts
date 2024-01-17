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
        setActiveNote: (state, { payload }: PayloadAction<TActive>) => {
            state.active = payload
        },
        setNotes: (state, { payload }: PayloadAction<TNote[]>) => {
            state.notes = payload
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, { payload }: PayloadAction<TActive>) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload
                }
                return note;
            })
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