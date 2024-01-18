import { Controller, useForm } from 'react-hook-form';
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from '../components'
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/journal';


export const NoteView = () => {
    const dispatch = useAppDispatch()
    const {
        active: note,
        messageSaved,
        isSaving
    } = useAppSelector(state => state.journal);
    const { control, watch, setValue, getValues, reset, formState: {
        isDirty,
    }, } = useForm({
        defaultValues: {
            id: note?.id,
            title: note?.title ? note.title : "",
            body: note?.body ? note.body : "",
        },
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onSaveNote = () => {
        dispatch(startSaveNote({}));
    }

    const onFileInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files?.length == 0 || target.files === null) {
            return
        }
        dispatch(startUploadingFiles({ files: target.files }))
    }

    useEffect(() => {
        if (note) {
            if (getValues("id") != note.id) {
                reset({
                    "id": note.id,
                    "title": note.title ? note.title : "",
                    "body": note.body ? note.body : "",
                });
            }
        }
    }, [note, reset, getValues]);

    const dateString = useMemo(() => {
        if (note?.date) {
            const newDate = new Date(note.date);
            return newDate.toUTCString()
        }
        return note?.date
    }, [note]);

    console.log(isDirty);

    useEffect(() => {
        const subscription = watch((value) => {
            if (note && note.id) {
                if (getValues("id") == note.id) {
                    dispatch(setActiveNote({
                        ...note,
                        ...value
                    }))
                }
            }
        }
        )
        return () => subscription.unsubscribe()
    }, [watch, note, getValues]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Note updated', messageSaved, 'success');
        }
    }, [messageSaved]);

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>

                <input
                    type="file"
                    multiple
                    onChange={(e) => onFileInputChange(e)}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
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
            {note?.imagesUrls && <ImageGallery imagesUrls={note.imagesUrls} />}
        </Grid>
    )
}