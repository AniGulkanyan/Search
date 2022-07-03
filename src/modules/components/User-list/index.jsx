import React, {
    useEffect,
    useState,
    useCallback} from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText, List as MuiList
} from "@mui/material";
import {SearchBar} from "../Searchbar";
import {doApiCall} from "../../global/units/api";
import {limit, userEndpoint} from "../../global/units/contsants";
import {debounce} from "@mui/material";

const fields = ['firstName', 'lastName', 'email', 'age'];

export const UserList = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        getListData();
    }, []);

    async function getListData(value) {
        const url = value ?  `${userEndpoint}/search?q=${value}&limit=${limit}` :  `${userEndpoint}?limit=${limit}`
        const response = await doApiCall({
            url,
            method: 'GET',
        });
        setList(response.users);
    }

    const debouncedChangeHandler = useCallback(debounce(getListData), []);

    return (
        <>
            <SearchBar onChangeHandler={debouncedChangeHandler} />
            <MuiList dense={true}>
            {
                list.map(
                    (item) => {
                        return (
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 54, height: 54 }} src={item.image} alt='avatar' />
                                </ListItemAvatar>
                                {
                                    fields.map((field) => {
                                        return <ListItemText
                                            key={field}
                                            primary={item[field]}
                                        />
                                    })
                                }
                            </ListItem>
                        )
                    }
                )
            }
        </MuiList>
        </>
    )
}