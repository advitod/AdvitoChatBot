import React, { useState } from "react";
import { BotConfig, Message } from "../types";
import MessageBubble from "./MessageBubble";

interface Props {
  bot: BotConfig | null;
}

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

const ChatWindow: React.FC<Props> = ({ bot }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!bot) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
        Select an assistant to start chatting.
      </div>
    );
  }

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      createdAt: new Date().toISOString()
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botId: bot.id,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });
      const data = await res.json();
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply ?? "Sorry, I couldn't respond.",
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      const errMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "There was an error talking to the AI. Please try again in a moment.",
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section className="flex h-full flex-1 flex-col bg-advitoCard/70">
      <header className="border-b border-slate-800 px-4 py-3">
        <div className="text-sm font-semibold">{bot.name}</div>
        <div className="text-xs text-slate-400">{bot.description}</div>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <div className="mt-10 text-center text-xs text-slate-500">
            Ask anything related to{" "}
            <span className="font-semibold text-slate-200">{bot.name}</span>.
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>
      <footer className="border-t border-slate-800 p-3">
        <div className="flex items-end gap-2">
          <textarea
            className="h-20 flex-1 resize-none rounded-xl border border-slate-700 bg-advitoBg px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-advitoAccent/60"
            placeholder={`Chat with ${bot.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={send}
            disabled={isSending || !input.trim()}
            className="h-10 rounded-xl bg-advitoAccent px-4 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-advitoAccent/40"
          >
            {isSending ? "..." : "Send"}
          </button>
        </div>
        <div className="mt-1 text-[10px] text-slate-500">
          AdvitoChatBot uses your configured AI backend. Do not share sensitive
          data.
        </div>
      </footer>
    </section>
  );
};

export default ChatWindow;

