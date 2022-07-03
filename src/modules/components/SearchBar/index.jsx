import React  from "react";
import TextField from '@mui/material/TextField';

export const SearchBar = ({onChangeHandler}) => {
    return <TextField
                onChange={(event) => onChangeHandler(event.target.value)}
                color="success"
                label="name/surname/email"
                margin="dense"
                sx={{width: '400px'}}
                />
}