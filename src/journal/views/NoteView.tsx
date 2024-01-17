import { Controller, useForm } from 'react-hook-form';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useMemo } from 'react';
import { setActiveNote, startSaveNote } from '../../store/journal';


export const NoteView = () => {
    const dispatch = useAppDispatch()
    const { active: note } = useAppSelector(state => state.journal);
    const { control, watch } = useForm({
        defaultValues: {
            title: note?.title,
            body: note?.body,
        },
    });

    const onSaveNote = () => {
        dispatch(startSaveNote({}));
    }

    const dateString = useMemo(() => {
        if (note?.date) {
            const newDate = new Date(note.date);
            return newDate.toUTCString()
        }
        return note?.date
    }, [note?.date]);

    useEffect(() => {
        const subscription = watch((value) => {
            if (note && note.id) {
                dispatch(setActiveNote({
                    ...note,
                    ...value
                }))
            }
        }
        )
        return () => subscription.unsubscribe()
    }, [watch]);

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>
                <Button
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="text"
                            variant="filled"
                            fullWidth
                            placeholder="Add a title"
                            label="Title"
                            sx={{ border: 'none', mb: 1 }}
                        />
                    )}
                />

                <Controller
                    name="body"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="text"
                            variant="filled"
                            fullWidth
                            multiline
                            placeholder="Body"
                            minRows={5}
                        />
                    )}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />

        </Grid>
    )
}