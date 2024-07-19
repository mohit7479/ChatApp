export const getSender = (loggedUser, users) => {
    if (!loggedUser || !users || users.length < 2) {
        return "Unknown User";
    }
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
    if (!loggedUser || !users || users.length < 2) {
        return "Unknown User";
    }
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};


export const isSameSender = (message, m, i, userId) => {
    return (
        i < message.length - 1 &&
        (message[i + 1].sender._id !== m.sender._id ||
            message[i + 1].sender._id === undefined) &&
        message[i].sender._id !== userId
    );
}

export const isLastMessage = (message, i, userId) => {
    return (
        i === message.length - 1 &&
        message[message.length - 1].sender._id !== userId ||
        message[message.length - 1].sender._id
    );
}

export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);

    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameUser = (message, m, i) => {
    {
        return i > 0 && message[i - 1].sender._id === m.sender._id;
    }
}