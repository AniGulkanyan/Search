import React  from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

 const SearchBar = ({onChangeHandler, list}) => {
    return (
        <Autocomplete
            id="select-demo"
            sx={{ width: 400 }}
            options={list}
            autoHighlight
            getOptionLabel={(option) => option.firstName && option.lastName && option.email}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={(event) => onChangeHandler(event.target.value.trim())}
                    color="success"
                    label="name"
                    sx={{width: '400px',
                        margin: '20px 30px 20px 70px '
                    }}
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    )
}

export default SearchBar;