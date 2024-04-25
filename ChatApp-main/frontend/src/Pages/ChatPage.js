import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/chat");
            console.log(response.data);
            setChats(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            <h1>Chatpage</h1>
            {chats.map(chat => <div key={chat.id}>{chat.chatName}</div>)}
        </div>
    );
};

export default ChatPage;
