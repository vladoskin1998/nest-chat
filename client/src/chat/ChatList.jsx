import React, { useState, useId, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { $api } from '../api/Api';
import { UPDATE_LIST_CHAT } from "../config";
import { choiceUser } from '../reducer/ChatReducer';

export const ChatList = ({ socket }) => {

    const [chatList, setChatList] = useState([])
    const idList = useId();
    const { id } = useSelector(state => state.authReducer.payloadUser)
    const { currentChatId, createdNewChat } = useSelector(state => state.chatReducer)

    const dispatch = useDispatch()

    const getChatList = () => {
        $api.post('chat/list-chat', { sourceUserId: id })
            .then(res => setChatList(res.data))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        socket.current?.on(UPDATE_LIST_CHAT, () => {
            getChatList()
            console.log(UPDATE_LIST_CHAT);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getChatList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdNewChat])


    const handlerItem = (chatId, destinationEmail) => {
        dispatch(
            choiceUser(
                {
                    currentChatId: chatId,
                    destinationEmail,
                }
            )
        )
    }

    return <div>
        <h4>Chat List</h4>
        <div style={styleList}>
            {
                chatList.map((it, id) => <div key={idList}
                    style={{ ...styleItem, background: currentChatId === it.chatId ? 'orange' : 'white' }}
                    onClick={() => handlerItem(it.chatId, it.users[0].email)}
                >
                    <span>{id}</span>
                    <span>{it.users[0].email}</span>
                </div>)
            }
        </div>

    </div>
}

const styleList = {
    display: "flex",
    flexDirection: 'column',
}

const styleItem = {
    display: "flex",
    columnGap: "6px",
    margin: '4px',
    padding: '8px',
    border: '1px solid grey',
    borderRadius: '3px',
    cursor: 'pointer'
}