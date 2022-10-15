import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { $api } from "../../api/Api";
import { LEAVE_ROOM, JOIN_ROOM, SEND_PRIVATE_MESSAGE, GET_PRIVATE_MESSAGE } from '../../config';


export const Messenger = ({ socket }) => {

    const [message, setMessage] = useState('')

    const [historyOnline, setHistoryOnline] = useState([])

    const { destinationEmail, currentChatId } = useSelector(state => state.chatReducer)
    const { id, email } = useSelector(state => state.authReducer.payloadUser)


    useEffect(() => {

        socket.current?.on(GET_PRIVATE_MESSAGE, (id, message) => setHistoryOnline(s => [...s, { id, message }]))

        return () => {
               // eslint-disable-next-line react-hooks/exhaustive-deps
            socket.current?.emit(LEAVE_ROOM, currentChatId)
        }
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {

        if (currentChatId) {
            socket.current?.emit(JOIN_ROOM, currentChatId)

            $api.get(`chat/list-message?chatId=${currentChatId}`)
                .then(res =>
                    setHistoryOnline(res.data.length ? res.data : [])
                )
                .catch(e => console.log(e))
        }

        return () => {
               // eslint-disable-next-line react-hooks/exhaustive-deps
            socket.current?.emit(LEAVE_ROOM, currentChatId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChatId])


    const sendMessage = () => {
        socket.current?.emit(
            SEND_PRIVATE_MESSAGE,
            {
                message,
                currentChatId,
                messageFromId: id,
                sourceEmail: email,
                destinationEmail,
            }
        )
        setHistoryOnline(s => [...s, { id, message }])
        setMessage('')
     
    }

    return (
        <div style={styleMessenger}>
            <h4> {destinationEmail || 'CHOICE USER TO START CHAT'}</h4>
            <div style={styleWindow}>
                {
                    currentChatId
                        ? <>
                            {
                                historyOnline.map(
                                    it => <div style={{ ...styleMessage, marginLeft: it.id === id ? "auto" : "5px" }}>
                                        {`  ${it.message}`}
                                    </div>
                                )
                            }
                        </>
                        : <h2 style={styleH}>CHOICE USER TO START CHAT</h2>
                }
            </div>
            <div>
                <input type="text"
                    style={inputStyle}
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    disabled={!currentChatId}
                />
                <button onClick={sendMessage} disabled={!currentChatId}>send</button>
            </div>
        </div>
    )
}

const styleMessenger = {
    display: 'grid',
    gridTemplateRows: '40px 1fr 60px',
    height: '80vh'
}

const styleWindow = {
    position: 'relative',
    padding: '15px',
    margin: '10px 0',
    border: '1px solid black',
    borderRadius: '3px',
    overflow: "scroll"
}

const inputStyle = {
    width: '30vw',
    marginTop: '8px',
    marginRight: '15px'
}

const styleMessage = {
    margin: '5px',
    border: '1px solid black',
    borderRadius: '3px',
    width: 'fit-content',
    padding: '4px'
}

const styleH = {
    color: 'orange',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}
