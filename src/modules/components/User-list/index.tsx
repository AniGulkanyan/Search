import React, {useEffect, useState} from 'react'
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText, List as MuiList
} from "@mui/material";
import {SearchBar} from "../Searchbar";
import {doApiCall} from "../../global/units/api";
import {limit, userEndpoint} from "../../global/units/contsants";

const fields = ['firstName', 'lastName', 'email', 'age'];

export const List = () => {

    const [list, setList] = useState<Array<any>>([]);

    useEffect(() => {
        getListData();
    }, []);

    async function getListData(value?: string) {
        const url = value ?  `${userEndpoint}/search?q=${value}&limit=${limit}` :  `${userEndpoint}?limit=${limit}`
        const response = await doApiCall({
            url,
            method: 'GET',
        });
        setList(response.users);
    }

    return (
        <>
            <SearchBar onChangeHandler={getListData} />
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
                                    fields.map((field: string) => {
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