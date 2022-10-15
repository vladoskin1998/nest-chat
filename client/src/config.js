export const baseURL = window.location.host === "localhost:3000"
    ? "http://localhost:5000"
    : window.location.origin

export const REGISTRATION = 'registration'
export const LOGIN = 'login'


export const JOIN_ROOM="join_room"
export const LEAVE_ROOM="leave_room"

export const SEND_PRIVATE_MESSAGE = "send_private_message"
export const GET_PRIVATE_MESSAGE = "get_private_message"

export const NOTIFICATION='notification'

export const NEW_CREATE_CHAT='new_create_chat'
export const UPDATE_LIST_CHAT='update_list_chat'

export const AUTH_SOCKET='auth_socket'