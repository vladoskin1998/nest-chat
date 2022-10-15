import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../http/AuthThunk";
import { useSelector } from "react-redux";
import { chatInit } from '../reducer/ChatReducer';

export const Navbar = () => {

    const dispatch = useDispatch()
    const { email } = useSelector(state => state.authReducer.payloadUser)

    const handlerLogout = () => {

        dispatch(logout())
        dispatch(chatInit())
    }

    return (
        <div style={styleHeader}>
            <h4 style={{ margin: 0 }}>{email}</h4>
            <button onClick={handlerLogout}>EXIT</button>
        </div>
    )
}


const styleHeader = {
    boxSizing: 'border-box',
    width: '100vw',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 20px',
    alignItem: 'center',
    background: 'orange',
    alignItems: 'center',
}