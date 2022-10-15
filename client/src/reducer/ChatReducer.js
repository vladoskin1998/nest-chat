import { createSlice } from '@reduxjs/toolkit'

export const chatReducer = createSlice({
    name: 'auth',
    initialState: {
        createdNewChat: new Date(),
        currentChatId: 0,
        destinationEmail: '',
    },
    reducers: {
        choiceUser: (state, {payload}) => {
            state.currentChatId = payload.currentChatId
            state.destinationEmail = payload.destinationEmail
        },

        createNewChat:(state, {payload}) => {
            state.currentChatId = payload.currentChatId
            state.destinationEmail = payload.destinationEmail
            state.createdNewChat = new Date()
        },

        chatInit:(state) => {
            state.createdNewChat = new Date()
            state.currentChatId = 0
            state.destinationEmail = ''
        }
    },
    extraReducers: {}
})

export const { choiceUser, createNewChat, chatInit } = chatReducer.actions

export default chatReducer.reducer