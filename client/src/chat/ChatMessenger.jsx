import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export const ChatMessenger = () => {

    const [message, setMessage] = useState('')
    const { currentEmail } = useSelector(state => state.chatReducer)

    return (
        <div style={styleMessenger}>
            <h4> {currentEmail  || 'CHOICE USER TO START CHAT'}</h4>
            <div style={styleWindow}>

            </div>
            <div >
                <input type="text"
                    style={inputStyle}
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
                <button >send</button>
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
    margin: '10px 0',
    border: '1px solid black',
    borderRadius: '3px',
}

const inputStyle = {
    width: '30vw',
    marginTop: '8px',
    marginRight: '15px'
}



