import React, { useState, useId } from "react";
import { $api } from '../api/Api';
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../reducer/ChatReducer";
import { NEW_CREATE_CHAT } from "../config";

export const SearchUser = ({ socket }) => {

    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])

    const { id } = useSelector(state => state.authReducer.payloadUser)
    const idList = useId();

    const dispatch = useDispatch()

    const handlerSearch = () => {
        $api.get(`user/search-user?email=${search}`)
            .then((res) => setSearchList(res.data))
            .catch((e) => console.log(e))
    }

    const handlerNewChat = async (destinationUid) => {
        $api.post('chat/create-chat', {
            destinationUserId: destinationUid,
            sourceUserId: id
        })
            .then((res) => {
                dispatch(
                    createNewChat(
                        {
                            currentChatId: res.data.chatId,
                            destinationEmail: res.data.email,
                        }
                    )
                )
                socket.current?.emit(NEW_CREATE_CHAT, res.data.email)
            })
            .catch(e => console.log(e))



    }

    return <div>
        <h4>Search User List</h4>
        <div style={styleList}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={handlerSearch}>Search</button>
        </div>
        <div>
            {
                searchList
                    .filter(it => id !== it.id)
                    .map((it, id) => <div style={styleItem} key={idList}>
                        <span>{id}</span>
                        <span>{it.email.length < 10 ? it.email : it.email.substr(0, 10) + '...'}</span>
                        <button onClick={() => handlerNewChat(it.id)}>new</button>
                    </div>)
            }
        </div>
    </div>
}

const styleList = {
    display: "flex",
    flexDirection: 'column',
    rowGap: "10px"
}

const styleItem = {
    display: "flex",
    columnGap: "6px",
    margin: '4px',
    padding: '8px',
    border: '1px solid grey',
    borderRadius: '3px'
}