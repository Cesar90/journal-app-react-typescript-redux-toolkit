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
            state.active = payload;
            state.messageSaved = '';
        },
        setNotes: (state, { payload }: PayloadAction<TNote[]>) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, { payload }: PayloadAction<TActive>) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload
                }
                return note;
            });
            state.messageSaved = `${payload.title}, updated successfully`
        },
        setPhotosToActiveNote: (state, { payload }: PayloadAction<string[]>) => {
            if (state.active && state.active.imagesUrls) {
                state.active.imagesUrls = [...state.active.imagesUrls, ...payload]
                state.isSaving = false
            }

        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, { payload }: PayloadAction<RequireOnly<TActive, "id">>) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== payload.id)
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
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;