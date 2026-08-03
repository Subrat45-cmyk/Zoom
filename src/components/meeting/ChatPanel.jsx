import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { motion } from 'framer-motion';
import axios from "axios";



const ChatPanel = ({ onClose, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const myId = localStorage.getItem('meeet_user_id') || 'local_user';
  const socket = useRef(null);

useEffect(() => {
  const loadMessages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/chat-history/${roomId}`
      );

      const myEmail = localStorage.getItem("meeet_user_email");

      const msgs = response.data.messages.map((msg, index) => ({
        id: index,
        sender: msg.sender,
        text: msg.message,
        isMe: msg.sender === myEmail,
        time: msg.timestamp
          ? new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      }));

      setMessages(msgs);
    } catch (error) {
      console.log(error);
    }
  };

  if (roomId) {
    loadMessages();
  }
}, [roomId]);
  
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {

    e.preventDefault();

    if (!input.trim()) return;

    if (socket.current && socket.current.readyState === WebSocket.OPEN) {

        socket.current.send(input);

    }

    setInput("");

};
  useEffect(() => {

    if (!roomId) return;

    const token = localStorage.getItem("token");

    socket.current = new WebSocket(
        `ws://127.0.0.1:8000/ws/${roomId}?token=${token}`
    );

    socket.current.onopen = () => {
        console.log("✅ WebSocket Connected");
    };

    socket.current.onclose = () => {
        console.log("❌ WebSocket Closed");
    };

    socket.current.onerror = (error) => {
        console.log("WebSocket Error:", error);
    };

   socket.current.onmessage = (event) => {
    const sender = event.data.split(":")[0].trim();
    const text = event.data.split(":").slice(1).join(":").trim();

    const myEmail = localStorage.getItem("meeet_user_email");

    setMessages((prev) => [
        ...prev,
        {
            id: Date.now(),
            sender,
            text,
            isMe: sender === myEmail,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
    ]);
};

    return () => {
        socket.current.close();
    };

}, [roomId]);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-80 h-full bg-white dark:bg-gray-900 border-l border-slate-200 dark:border-gray-800 flex flex-col absolute right-0 top-0 bottom-0 z-20"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-800">
        <h3 className="font-semibold text-slate-900 dark:text-gray-100">In-call Messages</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-500 dark:text-gray-400">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((m) => (
    <div
      key={m.id}
      className={`flex flex-col ${m.isMe ? "items-end" : "items-start"}`}
    >
      <span className="text-xs text-slate-400 dark:text-gray-500 mb-1">
        {m.sender} • {m.time}
      </span>

      <div
        className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${
          m.isMe
            ? "bg-red-600 text-white rounded-tr-none"
            : "bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100 rounded-tl-none"
        }`}
      >
        {m.text}
      </div>
    </div>
  ))}

  <div ref={messagesEndRef}></div>
</div>
      <div className="p-4 border-t border-slate-200 dark:border-gray-800">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..." 
            className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-gray-100 focus:outline-none focus:border-red-500"
          />
          <Button type="submit" variant="primary" size="icon" className="h-10 w-10 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatPanel;
