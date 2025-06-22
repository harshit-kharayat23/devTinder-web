import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([
    { text: "hello world" },
    { text: "Hello" },
  ]);

  return (
    <div className="w-1/2 mx-auto border border-gray-600 h-[80vh] m-5 flex flex-col">
      <h1 className="p-5 border-b border-gray-600 font-bold text-2xl">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {/* Dislplay messages */}
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                Obi-Wan Kenobi 
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex gap-2">
        {/* input  box */}
        <input className="p-2 border rounded-md  flex-1" type="text" />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
