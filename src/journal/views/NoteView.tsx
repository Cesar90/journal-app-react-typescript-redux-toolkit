import { Controller, useForm } from 'react-hook-form';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useAppSelector } from '../../store';
import { useMemo } from 'react';


export const NoteView = () => {

    const { active: note } = useAppSelector(state => state.journal)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: note?.title,
            body: note?.body,
        },
    });

    const dateString = useMemo(() => {
        if (note?.date) {
            const newDate = new Date(note.date);
            return newDate.toUTCString()
        }
        return note?.date
    }, [note?.date])

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>
                <Button color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
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