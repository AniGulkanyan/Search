import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText, List as MuiList
} from "@mui/material";
import SearchBar from "../SearchBar";
import {doApiCall} from "../../global/utils/api";
import {limit, userEndpoint} from "../../global/utils/contsants";
import {debounce} from "@mui/material";

const fields = ['firstName', 'lastName', 'email', 'age'];

export const UserList = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        getListData();
    }, []);

    async function getListData(value) {
        const url = value ? `${userEndpoint}/search?q=${value}&limit=${limit}` : `${userEndpoint}?limit=${limit}`
        const response = await doApiCall({
            url,
            method: 'GET',
        });
        setList(response.users);
    }

    const debouncedChangeHandler = useCallback(debounce(getListData), []);

    return (
        <>
            <SearchBar onChangeHandler={debouncedChangeHandler} list={list} />
            <MuiList dense={true} sx={{padding: '8px'}}>
            {
                list.map(
                    (item) => {
                        return (
                            <ListItem
                                key={item.id}
                                sx={{border: '1px solid grey',
                                margin: '4px 8px 4px 0px '}}>
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{ width: 54, height: 54 }}
                                        src={item.image}
                                        alt='avatar' />
                                </ListItemAvatar>
                                {
                                    fields.map((field, index) => {
                                        return <ListItemText
                                            key={`${item[fields[0] || '']}-${index}`}
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