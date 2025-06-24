// ChatScreen.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { MdArrowBackIos, MdSend } from "react-icons/md";

export default function ChatScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  const [messages, setMessages] = useState([
    { id: "1", text: "Hey!", sender: "user", time: "10:00 AM" },
    { id: "2", text: "Hello!", sender: "me", time: "10:05 AM" },
  ]);

  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: `${messages.length + 1}`,
        text: messageInput,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center bg-white p-4 shadow">
        <button onClick={() => navigate(-1)} className="mr-3">
          <MdArrowBackIos size={20} />
        </button>
        <img src={user?.image} alt="profile" className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-1">
          <p className="font-semibold">{user?.name || "Unknown"}</p>
        </div>
        <button>
          <FiMoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`max-w-xs p-3 rounded-lg text-sm ${
              item.sender === "me"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-100 text-black mr-auto"
            }`}
          >
            <p>{item.text}</p>
            <p className="text-xs text-right mt-1">{item.time}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center bg-white p-3 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full p-2 px-4 mr-3 outline-none"
        />
        <button onClick={sendMessage} className="text-blue-600">
          <MdSend size={24} />
        </button>
      </div>
    </div>
  );
}
