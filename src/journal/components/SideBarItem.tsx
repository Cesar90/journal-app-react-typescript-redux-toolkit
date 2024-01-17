import { FC, useMemo } from "react"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useAppDispatch } from "../../store"
import { setActiveNote } from "../../store/journal"

export const SideBarItem: FC<TNote> = ({ id, title, body, date, imagesUrls }) => {
    const dispatch = useAppDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({ id, title, body, date, imagesUrls }))
    }

    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + "..." : title
    }, [title])

    return (
        <ListItem key={id} disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
