import { createSlice } from '@reduxjs/toolkit'
import { authorization, logout } from '../http/AuthThunk'
import { parserJWT } from '../action/action'

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isLoad: false,
        payloadUser: null
    },
    reducers: {},
    extraReducers: {

        [authorization.pending]: (state) => {
            state.isLoad = true
        },
        [authorization.fulfilled]: (state, { payload }) => {

            const dataToken = parserJWT(payload.accessToken)

            dataToken.hasOwnProperty('id')
            ? state.payloadUser = dataToken
            : state.payloadUser = null

            localStorage.setItem('accessToken', payload.accessToken);
            state.isAuth = true
            state.isLoad = false
        },
        [authorization.rejected]: (state) => {
            state.isLoad = false
        },

        [logout.pending]: (state) => {
            state.isLoad = true
        },
        [logout.fulfilled]: (state) => {
            localStorage.clear('accessToken')
            state.isAuth = false
            state.isLoad = false
        },
        [logout.rejected]: (state) => {
            state.isLoad = false
            state.isAuth = false
        },
    }
})

export default authReducer.reducer