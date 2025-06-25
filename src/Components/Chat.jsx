import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnections } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { FE_DOMAIN_URL } from "../../utils/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chat = () => {
  const { targetUserId } = useParams();
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector((store) => store?.user?.loggedInUser);
  const userId = user?._id;

  const fetchChat = async () => {
    const chat = await axios.get(FE_DOMAIN_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        userId: msg?.senderId?._id,
        text: msg?.text,
        time: new Date(msg?.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnections();

    socket.emit("joinChat", {
      targetUserId,
      userId,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    socket.on("messageRecieved", ({ firstName, text, lastName, userId: senderId }) => {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, userId: senderId, text, time: currentTime },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleMessage = () => {
    if (!textMessage.trim()) return;

    const socket = createSocketConnections();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      targetUserId,
      userId,
      text: textMessage,
    });

    setTextMessage("");
  };

  return (
    <div className="w-full h-screen flex flex-col max-w-4xl mx-auto shadow-md border border-gray-300 rounded-lg bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 bg-slate-100 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => {
          const isOwnMessage = user?._id === msg.userId;
          return (
            <div
              key={index}
              className={`flex flex-col max-w-[80%] ${
                isOwnMessage ? "ml-auto items-end" : "items-start"
              }`}
            >
              <div className="text-sm text-gray-500 mb-1">
                {msg.firstName} {msg.lastName} • {msg.time}
              </div>
              <div
                className={`rounded-2xl px-4 py-2 text-sm shadow-md ${
                  isOwnMessage
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-300 bg-white flex gap-2 items-center">
        <Input
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleMessage()}
        />
        <Button onClick={handleMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
