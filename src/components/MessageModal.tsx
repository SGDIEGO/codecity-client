import { useSocketContext } from "@/context/Socket";
import { SocketEvents } from "@/context/Socket/events";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";

interface MessageModalProps {
}

interface Message {
    sender: string;
    content: string;
}

export interface GetMessageDto {
    from: string;
    to: string;
    content: string;
    date: Date
}

const MessageModal = ({ }: MessageModalProps) => {
    const { socket } = useSocketContext()

    const [searchParams] = useSearchParams()
    const to = searchParams.get("to")

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = () => {
        if (!message || message == "") return;

        setMessages((prev) => {
            return [...prev, {
                sender: "You",
                content: message
            }]
        })

        socket.emit(SocketEvents.SENDMESSAGETOUSER, {
            message: message,
            to: to
        })
    };

    useEffect(() => {
        
        const sendMessageToUser = (data: Message) => {
            setMessages((prev) => {
                return [...prev, data]
            })
        }
        
        const getMessages = (data: GetMessageDto) => {
            setMessages((prev) => {
                return [...prev, {
                    sender: data.from,
                    content: data.content
                }]
            })
        }
        
        socket.on(SocketEvents.SENDMESSAGETOUSER, sendMessageToUser)
        socket.on(SocketEvents.GETMESSAGES, getMessages)

        socket.emit(SocketEvents.GETMESSAGES, { to } )
        return () => {
            socket.off(SocketEvents.SENDMESSAGETOUSER, sendMessageToUser)
            socket.off(SocketEvents.GETMESSAGES, getMessages)
        }
    }, [])

    return (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Message { }</h2>
            <div className="max-h-60 overflow-y-auto mb-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 rounded-lg ${msg.sender === "You" ? "bg-blue-100 dark:bg-slate-700" : "bg-gray-100 dark:bg-slate-600"}`}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <textarea
                className="w-full p-2 mt-2 border rounded-lg dark:bg-slate-700 dark:text-slate-100"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-between mt-2">
                <Button name={"Close"} onClickHandler={socket.disconnect} redirect="/members" variant="danger"/>
                <Button name={"Send"} onClickHandler={handleSendMessage} variant="primary"/>
            </div>
        </div>
    );
}

export {
    MessageModal
}