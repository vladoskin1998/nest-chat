import React from 'react';
import { SearchUser } from './SearchUser';
import { ChatList } from './ChatList';
import { Navbar } from '../navbar/Navbar';
import { Messenger } from './messenger/Messenger';
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { baseURL, LEAVE_ROOM } from '../config';
import { useDispatch, useSelector } from "react-redux";
import { choiceUser } from '../reducer/ChatReducer';
import { NOTIFICATION, JOIN_ROOM, AUTH_SOCKET } from '../config';
import { useState } from 'react';
import { $auth } from '../api/Api';



export const Chat = () => {

    const socket = useRef(null)

    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()

    const { email } = useSelector(state => state.authReducer.payloadUser)

    useEffect(() => {

        socket.current = io(baseURL, {
            auth: {
                accessToken: localStorage.getItem('accessToken')
            }
        })

        if (socket.current) {
            setLoad(true)
        }


        socket.current?.on('connect', () => {
            console.log('Successfully connected!');
        });

        console.log(socket.current);

        socket.current?.on(AUTH_SOCKET, async (socketEvent, payload) => {
            console.log(socketEvent, payload);
            try {
                const res = await $auth.post('refresh', {})
                //    console.log(res);
                localStorage.setItem('accessToken', res.data.accessToken);

                socket.current.auth.accessToken = res.data.accessToken;
                socket.current?.disconnect().connect();
                socket.current?.emit(socketEvent, payload)

            } catch (error) {
                document.location.replace(`http://${window.location.host}`);
                localStorage.removeItem('accessToken')
            }

            // .then((res) => {
            //     console.log("socketEvent---->", socketEvent);
            //     localStorage.setItem('accessToken', res.data.accessToken);
            //     socket.current?.emit(socketEvent, payload)
            // })
            // .catch(e => {
            //     document.location.replace(`http://${window.location.host}`);
            //     localStorage.removeItem('accessToken')
            // })
        })

        socket.current.emit(JOIN_ROOM, email)

        socket.current?.on(NOTIFICATION, (currentChatId, destinationEmail) => {

            const goToChat = window.confirm(`Message from ${destinationEmail}`);

            if (goToChat) {
                dispatch(
                    choiceUser(
                        {
                            currentChatId,
                            destinationEmail,
                        }
                    )
                )
            }
        })

        return () => {
            socket.current?.emit(LEAVE_ROOM, email)
            socket.current?.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <>
            <Navbar />
            {
                load
                    ? <div style={styleChat}>
                        <SearchUser socket={socket} />
                        <ChatList socket={socket} />
                        <Messenger socket={socket} />
                    </div>
                    : '...loading'
            }

        </>
    );
}

const styleChat = {
    display: 'grid',
    margin: '10px',
    gridTemplateColumns: '250px 250px 1fr',
    columnGap: '15px'
}





