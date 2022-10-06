import { createSlice } from '@reduxjs/toolkit'

export const chatReducer = createSlice({
    name: 'auth',
    initialState: {
        currentChatId: 0,
        currentEmail: '',
    },
    reducers: {
        choiceUser: (state, {payload}) => {
            state.currentChatId = payload.currentChatId
            state.currentEmail = payload.currentEmail
        }
    },
    extraReducers: {}
})

export const { choiceUser } = chatReducer.actions

export default chatReducer.reducer