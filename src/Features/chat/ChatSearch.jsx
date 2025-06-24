// ChatSearch.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const chatList = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey! How are you?",
    lastSeen: "2 min ago",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    lastSeen: "5 min ago",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isOnline: false,
  },
  {
    id: "3",
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    lastSeen: "5 min ago",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isOnline: false,
  },
];

export default function ChatSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-400 p-4 text-white font-semibold text-lg">Messages</div>

      <div className="p-4">
        <div className="flex items-center bg-gray-100 p-2 rounded-full border">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Find or start a conversation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        {filteredChats.length === 0 ? (
          <p className="text-center text-gray-400 mt-6">No Chat found.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {filteredChats.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/chat-message/${item.id}`, { state: { user: item } })
                }
                className="flex items-center justify-between p-3 border-b cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">{item.lastSeen}</p>
                  <div className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center mt-1">
                    2
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
