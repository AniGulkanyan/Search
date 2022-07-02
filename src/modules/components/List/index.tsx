import React, {useEffect, useState} from 'react'
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText, List as MuiList
} from "@mui/material";
import {SearchBar} from "../Searchbar";
import {doApiCall} from "../../global/api";
import {limit, userEndpoint} from "../../global/contsants";

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
                    (item:any) => {
                        return (
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src={item.image} alt='avatar'/>
                                    </Avatar>
                                </ListItemAvatar>
                                {
                                    fields.map((field, index) => {
                                        console.log(item)
                                        return <ListItemText
                                            key={`${item[fields[0] || '']}-${index}`} // for uniqueness
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