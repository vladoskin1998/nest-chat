import React, { useState, useEffect } from "react";

export const ChatList = ({ socket }) => {

    const [chatList, setChatList] = useState([])

    useEffect(() => { }, [])

    return <div>
        <h4>Chat List</h4>
        <div>
            {
                chatList.map((it, id) => <div style={{ display: "flex", columnGap: "10px" }}>
                    <span>{id}</span>
                    <span>{it.email}</span>
                </div>)
            }
        </div>

    </div>
}