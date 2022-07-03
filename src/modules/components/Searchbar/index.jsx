import React  from "react";
import TextField from '@mui/material/TextField';

interface ISearchBar {
    onChangeHandler: (value: string) => void;
}

export const SearchBar = ({onChangeHandler}: ISearchBar) => {
    return <TextField
                onChange={(event) => onChangeHandler(event.target.value.trim())}
                color="success" label="name/surname/email"
                margin="dense"
            />
}