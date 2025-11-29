import React from "react";
import { Message } from "../types";

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex gap-2 text-sm ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mt-1 h-7 w-7 rounded-full bg-advitoAccent/20 text-center text-xs leading-7 text-advitoAccent">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
          isUser
            ? "bg-advitoAccent text-slate-950"
            : "bg-advitoCard text-slate-100 border border-slate-800"
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="mt-1 h-7 w-7 rounded-full bg-slate-700 text-center text-xs leading-7">
          U
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
