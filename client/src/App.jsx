import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, } from "react-router-dom";
import { Chat } from './chat/Chat';
import { Auth } from './auth/Auth';

function App() {
    <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="chat" element={<Chat />} />
        <Route path="auth" element={<Auth />} />
    </Routes>

}

export default App;








