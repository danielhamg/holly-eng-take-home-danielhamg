"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const exampleReplies = [
  "Hello! How can I help you?",
  "That's interesting!",
  "Can you tell me more?",
  "I'm just a bot, but I'm here to chat!",
  "Let's talk about something fun.",
];

type Message = {
  text: string;
  sender: "user" | "bot";
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { text: input, sender: "user" };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    // Call your API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages((msgs) => [
      ...msgs,
      { text: data.reply, sender: "bot" },
    ]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md flex flex-col flex-1 border rounded shadow bg-white p-4 h-[70vh]">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Chat
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}