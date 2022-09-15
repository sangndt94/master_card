// (C) 2020 GoodData Corporation
import React, { createContext, useState } from "react";

export interface IMessage {
    id: string;
    type: "success" | "progress" | "error" | "warning";
    text: string;
    isPopIn?: boolean;
    className?: string;
}

interface IMessagesContext {
    messages: IMessage[];
    addMessage: (message: IMessage, timeout?: number) => void;
    removeMessage: (messageId: string) => void;
}

export const MessagesContext = createContext<IMessagesContext>({} as any);

export const MessagesProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const addMessage = (message: IMessage, timeout?: number) => {
        setMessages([...messages, message]);
        if (timeout) {
            setTimeout(() => removeMessage(message.id), timeout);
        }
    };

    const removeMessage = (messageId: string) => {
        const filteredMessages = messages.filter((message) => message.id !== messageId);
        setMessages(filteredMessages);
    };

    return (
        <MessagesContext.Provider
            value={{
                messages,
                addMessage,
                removeMessage,
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
};
