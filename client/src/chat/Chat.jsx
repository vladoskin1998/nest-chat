import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import io from 'socket.io-client';
import { SearchUser } from './SearchUser';
import { ChatList } from './ChatList';

const URL = "http://localhost:5000";
//let socket = io(URL, { autoConnect: false });


function App() {

    let socket = useRef(null)



    const [user, setUser] = useState([])


    const [message, setMessage] = useState({
        userId: '',
        userName: '',
        message: '',
    })
    const [messageList, setMessageList] = useState([])

    console.log(socket);

    useEffect(() => {

        let name = localStorage.getItem('userId');

        if (!name) {
            localStorage.setItem('userId', Math.random().toString());
            name = localStorage.getItem('userId');
        }


        socket.current = io(URL)

        socket.current.auth = { userName: name };

        setMessage(s => ({ ...s, userName: name }))

        socket.current.on('users', user => setUser(user))

        socket.current.on('private message', (id, msg) => setMessageList(s => [...s, msg]))

        return () => {
            socket.current.disconnect()
        }

    }, [])


    console.log("message--->", message);

    const send = () => {
        socket.current.emit('send_message', message.chatid, message.message)
        setMessage(s => ({ ...s, message: "" }))
    }

    const chatToUser = ({ userID }) => {
        console.log("chatid--->", userID);

        setMessage(s => ({ ...s, chatid: userID }))
    }


    console.log(user);
    return (
        socket.current !== 0
            ?
            <div style={{ display: 'grid', gridTemplateColumns: '200px 200px 1fr' }}>
                <SearchUser />
                <ChatList soket={socket}/>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '20vw' }}>
                        {
                            user.filter(it => it.userID !== socket.current.id).map((it, index) => <div onClick={() => chatToUser(it)} key={index} style={styleUser}>
                                user {index}
                            </div>
                            )
                        }
                    </div>
                    <div>
                        <div style={styleInput}>
                            <input type="text"
                                onChange={e => setMessage(s => ({ ...s, message: e.target.value }))}
                                value={message.message}
                            />
                            <button onClick={send}>send</button>
                        </div>
                        <div>
                            {
                                messageList.map((it, index) => <div style={{ padding: "15px" }} key={index}>{it}</div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>...loading</div>
    );
}

export default App;




const styleUser = {
    padding: "10px",
    background: "grey",
    cursor: "pointer",
    borderRadius: "4px",
    margin: "8px"
}

const styleInput = {
    display: 'flex',
    padding: "20px",
    columnGap: "10px",
    width: '70vw'
}






