import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LOGIN, REGISTRATION } from '../config';
import { useDispatch, useSelector } from "react-redux";
import { authorization } from '../http/AuthThunk'
import { Link } from "react-router-dom";

export const Auth = () => {

    const { isAuth } = useSelector((state) => state.authReducer)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('admin@mail.com')
    const [password, setPassword] = useState('1267')

    const [isLogin, setIsLogin] = useState(true)

    let navigate = useNavigate();

    useEffect(() => {
        isAuth ? navigate('chat') : navigate('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    const handlerAuth = () => {
        dispatch(
            authorization(
                {
                    method: isLogin ? LOGIN : REGISTRATION,
                    email, password
                }
            )
        )
    }

    return (<div style={authStyle}>
        <h4>Authentication</h4>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <Link to='chat'>
            <button onClick={handlerAuth}>{isLogin ? 'Login' : 'Registration'}</button>
        </Link>
        
        <div>
            <input type="checkbox" onClick={() => setIsLogin(s => !s)} defaultChecked />
            <span>Login</span>
        </div>

    </div>)
}


const authStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
    width: '200px',
    margin: '0 auto',
    paddingTop: '15px'
}