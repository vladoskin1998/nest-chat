import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import authReducer from '../reducer/AuthReducer';
import chatReducer from '../reducer/ChatReducer';
import thunk from 'redux-thunk';

export default configureStore({
    reducer: {
        authReducer: authReducer,
        chatReducer: chatReducer,
    }
},
    applyMiddleware(thunk)
)