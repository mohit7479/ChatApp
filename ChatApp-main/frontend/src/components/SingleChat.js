import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box, Text } from '@chakra-ui/layout';
import { FormControl, IconButton, Input, Spinner, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogic';

import ScrollableChat from './ScrollableChat';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import ProfileModal from './miscellaneous/ProfileModal';
import axios from 'axios';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const toast = useToast();

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage(""); // Clear the input field after sending the message
                const { data } = await axios.post('http://localhost:5000/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);

                setMessage([...message, data]);
                console.log(data);
            } catch (error) {
                console.error("Error sending message:", error.response ? error.response.data : error.message);
                toast({
                    title: "Error Occurred",
                    description: error.response.data.message || "Failed to send message",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, config);
            console.log(message);
            setMessage(data);
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error Occurred",
                description: error.response.data.message || "Failed to Load message",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // Typing Indicator handler
    };

    return (
        <>
            {selectedChat ? (<>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton display={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />} onClick={() => setSelectedChat("")} />
                    {!selectedChat.isGroupChat ? (<>{getSender(user, selectedChat.users)}
                        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                    </>
                    ) : (
                        <>
                            {selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                        </>
                    )}
                </Text>
                <Box display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden">
                    {/* Message Here */}
                    {loading ? (<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />) :
                        (<div className='messages'>
                            <ScrollableChat message={message} />
                        </div>)}
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        <Input variant="filled" bg="#E0E0E0" placeholder='Enter a message..' onChange={typingHandler} value={newMessage} />
                    </FormControl>

                </Box>
            </>) : (<Box display="flex" alignItems="center" justifyContent="center" h="100%" >
                <Text fontSize="3xl" pb={3} fontFamily="Work sans" >
                    Click on a user to start chatting
                </Text>
            </Box>)}
        </>
    )
}

export default SingleChat