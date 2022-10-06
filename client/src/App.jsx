import React, { useEffect, } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Chat } from './chat/Chat';
import { Auth } from './auth/Auth';
import { refresh } from './http/AuthThunk'
import { useSelector, useDispatch } from 'react-redux';

function App() {

    const dispatch = useDispatch()
    const { isAuth, isLoad } = useSelector((state) => state.authReducer)

    useEffect(() => {
        console.log('APPPPPPP');
        dispatch(
            refresh()
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if (isLoad) {
    //     return '...Loading'
    // }
    return (
        <>
            {
                !isLoad
                    ? <Routes>
                        {
                            isAuth
                                ? <Route path="chat" element={<Chat />} />
                                : <Route path="*" element={<Navigate to="/" replace />} />
                        }
                        < Route path="/" element={< Auth isAuth={isAuth} />} />
                    </Routes >
                    : <h3>...Loading</h3>}
        </>
    )
}

export default App;








