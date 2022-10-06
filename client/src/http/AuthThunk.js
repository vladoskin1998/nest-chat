import { createAsyncThunk } from "@reduxjs/toolkit"
import { $auth } from "../api/Api";

export const refresh = createAsyncThunk(
    'auth/authorization',
    async () => {
        const response = await $auth.post('refresh', {})
        return response.data
    }
)

export const authorization = createAsyncThunk(
    'auth/authorization',
    async (payload) => {

        const { method, email, password } = payload
        const response = await $auth.post(`${method}`, { email, password })
        return response.data
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await $auth.delete('logout')
    }
)