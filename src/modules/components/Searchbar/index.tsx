import React  from "react";
import TextField from '@mui/material/TextField';

interface ISearchBar {
    onChangeHandler: (value: string) => void;
}

export const SearchBar = ({onChangeHandler}: ISearchBar) => {
    return <TextField
                onChange={(event) => onChangeHandler(event.target.value)}
                color="success" label="Name"
                helperText="Please enter the name"
                margin="dense"
            />
}